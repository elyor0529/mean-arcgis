'use strict';

if ('DEBUG_FD' in process.env) {
    require('debug-fd-deprecated');
}

const express = require('express');
const cors = require('cors')
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const serverConfig = require('./config');
const dataSource = require('./datasource');
const socketIo = require('./socket-io');
const registerRoutes = require('./routes/index');

class AppBackend {

    constructor() {

        this.port = serverConfig.app.port;
        this.envType = serverConfig.app.envType;

        this.init();
    }

    init() {

        this._app = express();

        this._addLogger();
        this._addParserSupport();

        this._httpServer = http.Server(this._app);
        this._socket = this._setupSocketIo();

        this._serveBuildFolder();
        this._createApiEndpoints();
        this._setupDbConnection();

    }

    _createApiEndpoints() {
        const router = express.Router();

        this._app.get('/', function (req, res) {
            res.json({
                message: 'Blood Donors Api',
                version: '0.1.0'
            })
        });

        this._app.get('/api', (req, res) => {
            res.redirect('/');
        });

        registerRoutes(router, this._socket);

        this._app.use(cors())
        this._app.use('/api', router);
    }

    _serveBuildFolder() {

        this._app.use(express.static('build'));
    }

    _setupDbConnection() {
        dataSource.init();
    }

    _setupSocketIo() {
        return socketIo.init(this._httpServer);
    }

    _addLogger() {
        if (['development', 'test'].includes(this.envType)) {

            this._app.use(morgan('dev'));
        }
    }

    _addParserSupport() {
        const plugins = [
            bodyParser.json(),
            bodyParser.json({type: 'application/vnd.api+json'}),
            bodyParser.urlencoded({extended: true}),
            methodOverride('X-HTTP-Method-Override')
        ];

        plugins.forEach((plugin) => {
            this._app.use(plugin);
        });
    }

    start() {
        return this._httpServer.listen(this.port, () => {

            console.log('Backend services started and listening at port:', this.port);
        });
    }
}

module.exports = AppBackend;
