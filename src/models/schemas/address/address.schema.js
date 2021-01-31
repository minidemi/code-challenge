const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

module.exports = new mongoose.Schema ({
    id: {type: ObjectId},
    street: {type: String},
    state: {type: String},
    city: {type: String},
    country: {type: String},
    zip: {type: String}
});