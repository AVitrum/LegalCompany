const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const RequestSchema = new Schema({
    title: String,
    fullName: String,
    email: String,
    phone: String,
    description: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
});

const RequestModel = model('Request', RequestSchema);
module.exports = RequestModel;