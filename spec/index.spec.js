const request = require('request');
const CONFIG = require('../src/server/CONFIG');
const BASE_URL = 'http://localhost:3000';
const HOME_PATH = [BASE_URL, 'home'].join('/');
const Server = require('../src/server/index');

// beforeAll(() => {
//     Server.init();
// });

// afterAll(() => {
//     Server.closeServer();
// });

describe('Testeando el servidor', () => {
    describe('GET /', () => {
        it('el status code es 200', (done) => {
            Server.init();
            request.get(BASE_URL, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it('debe devolver "Microservice Started"', (done) => {
            request.get(BASE_URL, (error, response, body) => {
                expect(body).toBe('Microservice Started!');
                done();
            });
        });
    });
    describe('GET /home', () => {
        it('el status code es 200', (done) => {
            request.get(HOME_PATH, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it('debe devolver "Home works!"', (done) => {
            request.get(HOME_PATH, (error, response, body) => {
                expect(body).toBe('Home works!!');
                done();
                Server.closeServer();
            });
        });
    });
});