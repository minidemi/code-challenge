'use strict';
const mongoose = require('mongoose');
const userSchema = require('./schemas/users/user.schema');

const models = {

    User: mongoose.model('user', userSchema)

};

module.exports = models;