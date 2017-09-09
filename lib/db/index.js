'use strict';

const mongo = require('./mongo');

const DEFAULT_MONGO_URL = 'mongodb://mongodb:27017/nasa';
const MONGO_DB_URL = process.env.MONGO_DB_URL || DEFAULT_MONGO_URL;

const state = () => mongo.connection.readyState;
const connectTo = url => mongo.connect(url, { useMongoClient: true });
const closeConnection = () => new Promise((resolve, reject) =>
    mongo.connection.close(err => err ? reject(err) : resolve())
);

const connect = () => connectTo(MONGO_DB_URL);

module.exports = {
    state,
    connect,
    connectTo,
    closeConnection
};
