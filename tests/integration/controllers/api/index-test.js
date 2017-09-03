'use strict';

const request    = require('supertest');
const HttpStatus = require('http-status-codes');

const ROOT = '../../../..';
const app = require(`${ ROOT }/app`);

describe('GET /', () => {
    it('should return hello-world json', (done) => {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(
                HttpStatus.OK,
                { hello: 'world' },
                done);
    });
});
