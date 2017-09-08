'use strict';

const ROOT = '../../..';
const db = require(`${ ROOT }/lib/db`);

const dbUrl = process.env.MONGO_DB_URL;

describe('db', () => {
    it('should connect and disconnect', done => {
        db.connectTo(dbUrl)
          .then(() => db.closeConnection())
          .then(() => done())
          .catch(done);
    });
});
