process.env.NODE_ENV = 'test';

require('../../app');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('expect.js');
const assert = require('assert');

let should = chai.should();

chai.use(chaiHttp);

describe("/Api ping", () => {

    it("it should ping to api", () => {

        chai.request("http://localhost:3000")
            .get("/api/donor")
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.equals('Blood Donors Api');
            });
    });

});
