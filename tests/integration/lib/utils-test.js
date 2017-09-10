'use strict';

const expect = require('chai').expect;
const HttpStatus = require('http-status-codes');

const ROOT  = '../../..';
const utils = require(`${ ROOT }/lib/utils`);


describe('utils', () => {
    it('should get NEOs', () => {
        const exampleObj = { near_earth_objects: true };

        expect(utils.getNearEarthObjects(exampleObj)).to.be.true;
    });

    describe('validation', () => {
        it('should valdiate true properly', () => {
            const req = { query: { hazardous: 'true' } };

            expect(utils.simpleQueryValidation(req)).to.deep.equal({ isHazardous: true });
        });

        it('should valdiate false properly', () => {
            const req = { query: { hazardous: 'false' } };
            expect(utils.simpleQueryValidation(req)).to.deep.equal({ });
        });

        it('should valdiate null properly', () => {
            const req = { query: null };
            expect(utils.simpleQueryValidation(req)).to.deep.equal({ });
        });
    });

    describe('controller', () => {
        const defaultErrMsg = 'That didn\'t work! :(';
        const defaultType = 'application/json';

        it('should handle error properly', () => {
            const resSpy = {
                status(status) {
                    expect(status)
                        .to
                        .equal(HttpStatus.INTERNAL_SERVER_ERROR);
                    return this;
                },
                send(text) {
                    expect(text).to.equal(defaultErrMsg);
                }
            };

            utils.controllerErrHandler(resSpy)('');
        });

        it('should handle success properly', () => {
            const expObj = { hello: 'world' };
            const resSpy = {
                status(status) {
                    expect(status).to.equal(HttpStatus.OK);
                    return this;
                },
                type(text) {
                    expect(text).to.equal(defaultType);
                    return this;
                },
                json(obj) {
                    expect(obj).to.deep.equal(expObj);
                }
            };

            utils.controllerOkHandler(resSpy)(expObj);
        });
    });
});
