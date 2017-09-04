'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const makeNeoModel = () => {
    const neoSchema = new Schema({
        date: Date,
        reference: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        speed: { // km/h
            type: String,
            required: true
        },
        isHazardous: {
            type: Boolean,
            required: true
        }
    });

    neoSchema.pre('save', next => {
        const self = this;

        if (typeof this.date === 'string') {
            self.date = new Date(self.date);
        }

        next();
    });

    return mongoose.model('Neo', neoSchema);
};

module.exports = makeNeoModel();
