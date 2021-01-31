const mongoose = require('mongoose');
const userSchema = require('./schemas/users/user.schema');
const addressSchema = require('./schemas/address/address.schema');

const models = {

    User: mongoose.model('user', userSchema),
    Address: mongoose.model('address', addressSchema)
};

module.exports = models;