'use strict';
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

module.exports = new mongoose.Schema({
    id: {type: ObjectId},
    name: {type: String},
    email: {type: String},
    birthDate: {type: String},
});