process.env.NODE_ENV = 'test';

require('../../app');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('expect.js');
const assert = require('assert');
const url = "http://localhost:3000";

let should = chai.should();

chai.use(chaiHttp);

describe("/GET All Donors", () => {
    it("it should GET all the donors", () => {

        chai.request(url)
            .get("/api/donor")
            .end((err, res) => {

                should.equal(err, null);
                res.should.have.status(200);

                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);

                res.body[0].should.have.property('firstName');
                res.body[0].should.have.property('lastName');

            });
    });
});

describe('/POST Donor', () => {
    it('it should POST a donor', () => {
        let donor = {
            firstName: "Sherzod",
            lastName: "Nurjonov",
            contactNo: "+1234567891011",
            email: "jd.sherzod@gmail.com",
            bloodGroup: "+A",
            longitude: 45,
            latitude: 45
        };

        chai.request(url)
            .post('/api/donor')
            .send(donor)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.book.should.have.property('firstName');
                res.body.book.should.have.property('lastName');
                res.body.book.should.have.property('email');
                res.body.book.should.have.property('bloodGroup');
                res.body.book.should.have.property('longitude');
                res.body.book.should.have.property('latitude');
                res.body.book.should.have.property('contactNo');
            });
    });
});

describe('/GET/:id donor', () => {
    it('it should GET a donor by the given id', () => {
        let donor = {
            firstName: "Sherzod",
            lastName: "Nurjonov",
            contactNo: "+1234567891011",
            email: "jd.sherzod@gmail.com",
            bloodGroup: "+A",
            longitude: 45,
            latitude: 45
        };
        chai.request(url)
            .get('/api/donor/' + donor.id)
            .send(donor)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('firstName');
                res.body.should.have.property('lastName');
                res.body.should.have.property('contactNo');
                res.body.should.have.property('email');
                res.body.should.have.property('_id').eql(donor.id);
            });
    });
});

describe('/PUT/:id donor', () => {
    it('it should UPDATE a donor given the id', () => {
        let donor = {
            firstName: "Sherzod",
            lastName: "Nurjonov",
            contactNo: "+1234567891011",
            email: "jd.sherzod@gmail.com",
            bloodGroup: "+A",
            longitude: 45,
            latitude: 45
        };
        chai.request(url)
            .put('/api/donor/' + donor.id)
            .send({
                firstName: "Sher",
                lastName: "Nurjon",
                contactNo: "+1234567891011",
                email: "jd.sherzod@gmail.com",
                bloodGroup: "+A",
                longitude: 45,
                latitude: 45
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.donor.should.have.property('firstName').eql('Sher');
            });
    });
});

describe('/DELETE/:id donor', () => {
    it('it should DELETE a donor given the id', () => {

        let donor = {
            firstName: "Sherzod",
            lastName: "Nurjonov",
            contactNo: "+1234567891011",
            email: "jd.sherzod@gmail.com",
            bloodGroup: "+A",
            longitude: 45,
            latitude: 45
        };

        chai.request(url)
            .post('/api/donor')
            .send(donor)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                let _id = res.body.book.should.have.property('_id');

                chai.request(url)
                    .delete('/api/donor/' + _id)
                    .send({
                        firstName: "Sher",
                        lastName: "Nurjon",
                        contactNo: "+1234567891011",
                        email: "jd.sherzod@gmail.com",
                        bloodGroup: "+A",
                        longitude: 45,
                        latitude: 45
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.donor.should.have.property('firstName').eql('Sher');
                    });

            });

    });
});