const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const should = chai.should();
chai.use(chaiHttp);
const api = server.init();

describe('users', () => {
    it('should list ALL users on /users GET', done => {
        chai.request(api)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });
    it('should list a SINGLE users on /users/<id> GET', done => {
        chai.request(api)
            .get('/users/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    });
    it('should add a SINGLE users on /users POST');
    it('should update a SINGLE users on /users/<id> PUT');
    it('should delete a SINGLE users on /users/<id> DELETE');
});