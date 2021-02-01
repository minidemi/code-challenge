const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const { ObjectId } = require('mongodb');
 
module.exports = mongoose.Schema({
    id: { type: ObjectId },
    name: { type: String },
    email: { type: String },
    birthDate: { type: String },
    address: { type: Schema.Types.ObjectId, ref: "address" }
});