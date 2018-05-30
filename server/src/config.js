const {config} = require('dotenv');
config({silent: true});

module.exports = {
    mongoDb: {
        //uri: process.env.MONGODB_URI ||  "mongodb://localhost:27017/blood-donor"
        uri: process.env.MONGODB_URI || "mongodb://heroku_c0tcx0lm:4fi8bvpo1prlmt2cabveqq79qu@ds161551.mlab.com:61551/heroku_c0tcx0lm"
    },
    app: {
        port: process.env.PORT || 3000,
        envType: process.env.NODE_ENV || "test"
    }
};
