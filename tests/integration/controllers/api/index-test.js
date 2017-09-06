'use strict';

const request    = require('supertest');
const HttpStatus = require('http-status-codes');

const ROOT = '../../../..';
const app = require(`${ ROOT }/app`);

describe('main controller', () => {
    it('should return hello-world json', (done) => {
        request(app)
            .set('Accept', 'application/json')
            .get('/')
            .expect('Content-Type', /json/)
            .expect(
                HttpStatus.OK,
                { hello: 'world' },
                done
            );
    });
});
