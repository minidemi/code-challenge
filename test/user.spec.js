const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const url= 'http://localhost:5000/api/users';
const router = require('../src/routes/users/users.routes');
const server = require('../index');
const User = require('../src/models/models').User;
 
chai.use(chaiHttp);
 
describe('Users API tests', () => {
 
    //POST
    describe('POST user', () => {
        it('Should insert an user', (done) => {
            const  user = new User(
                {
                    _id: '60171f9a1b530a0e38289ab4',
                    name: 'Test', 
                    email: 'test@gmail.com', 
                    birthDate: '1900-10-12'
                }
            )
 
            chai.request(server)
            .post('/users/createUsers')
            .send(user)
            .end((err,res) => {
                expect(res).to.have.status(201);
                expect(res.body.result.data).to.be.a('object');
                done();
            });
        });
    });
 
    //PUT
    describe('PUT user', () => {
        it('Should update an user', (done) => {
 
            const  user = new User(
                {
                    name: "Test-updated", 
                    email: "updated@gmail.com", 
                    birthDate: "1999-01-01"
                }
            )
 
            chai.request(server)
            .put('/users/updateUsersById/60171f9a1b530a0e38289ab4')
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body.result.data).to.be.a('object');
                done();
            });
        });
    });
 
    //GET one
    describe('GET user', () => {
        it('Should get an user', (done) => {
 
            chai.request(server)
            .get('/users/getusersById/60171f9a1b530a0e38289ab4')
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body.result.data).to.be.a('object');
                done();
            });
        });
    });
 
    //GET
    describe('GET all users', () => {
        it('Should retrieve every user', (done) => {
            chai.request(server)
            .get('/users/getusers')
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body.result.data).to.be.a('array');
                done();
            });
        });
    })
 
    //DELETE one
    describe('DELETE user', () => {
        it('Should delete an user', (done) => {
 
            chai.request(server)
            .delete('/users/deleteUsersById/60171f9a1b530a0e38289ab4')
            .end((err,res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
    });
})