'use strict';

const _          = require('lodash/fp');
const { expect } = require('chai');

const ROOT = '../../..';
const db = require(`${ ROOT }/lib/db`);
const neo = require(`${ ROOT }/lib/neo`);
const {
          MONGO_DB_URL,
          fillDbWithNeos,
          removeNeos,
          sameNeoAs
      } = require(`${ ROOT }/tests/utils`);

describe('neo lib', () => {
    before(done => {
        db.connectTo(MONGO_DB_URL)
          .then(() => fillDbWithNeos())
          .then(() => done())
          .catch(done);
    });

    after(done => {
        removeNeos()
            .then(() => db.closeConnection())
            .then(() => done())
            .catch(done);
    });


    it('should be able to find a neo', done => {
        const expectedNeo = {
            reference: '2021277',
            speed: '55834.2714874122',
            name: '21277 (1996 TO5)',
            isHazardous: false
        };

        neo.findNeo({ reference: '2021277' })
            .then(_.head)
            .then(sameNeoAs(expectedNeo))
            .then(() => done())
            .catch(done);
    });

    [{
        isHazardous: true,
        reference: '3010077',
        speed: '88119.6612737317',
        name: '(1997 GD32)'
    }, {
        isHazardous: false,
        reference: '3008375',
        speed: '98860.8779642102',
        name: '(1996 BT)'
    }].forEach(({ isHazardous, reference, speed, name }) => {
        it('should be able to find fastest neo', done => {
            const expectedNeo = {
                isHazardous,
                reference,
                speed,
                name
            };

            neo.findFastestNeo({ isHazardous })
                .then(sameNeoAs(expectedNeo))
                .then(() => done())
                .catch(done);
        });
    });

    [{
        isHazardous: true,
        year: 1915,
        count: 2
    }, {
        isHazardous: false,
        year: 1994,
        count: 9
    }].forEach(({ isHazardous, year, count }) => {
        it('should be able to getYearWithMostNeos', done => {
            const expectedResponse = {
                year, count
            };

            neo.getYearWithMostNeos({ isHazardous })
               .then(foundData => {
                   expect(foundData.year).to.equal(expectedResponse.year);
                   expect(foundData.count).to.equal(expectedResponse.count);
               })
               .then(() => done())
               .catch(done);
        });
    });

    [{
        isHazardous: true,
        month: 8,
        year: 1915,
        count: 2
    }, {
        isHazardous: false,
        month: 10,
        year: 1991,
        count: 3
    }].forEach(({ isHazardous, month, year, count }) => {
        it('should be able to get month with most Neos', done => {
            const expectedResponse = {
                month, year, count
            };

            neo.getMonthWithMostNeos({ isHazardous })
               .then(foundData => {
                   expect(foundData.month).to.equal(expectedResponse.month);
                   expect(foundData.year).to.equal(expectedResponse.year);
                   expect(foundData.count).to.equal(expectedResponse.count);
               })
               .then(() => done())
               .catch(done);
        });
    });
});
