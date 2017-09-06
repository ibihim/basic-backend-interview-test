'use strict';

const mongo = require('./mongo');

const state = () => mongo.connection.readyState;
const connectTo = url => mongo.connect(url, { useMongoClient: true });
const closeConnection = () => new Promise((resolve, reject) =>
    mongo.connection.close(err => err ? reject(err) : resolve())
);

module.exports = {
    state,
    connectTo,
    closeConnection
};
