const mongoose = require('mongoose');
const schema = {
    firstName: {type: String},
    lastName: {type: String},
    contactNo: {type: String},
    email: {type: String},
    bloodGroup: {type: String},
    longitude: {type: Number},
    latitude: {type: Number}
};
const mongooseModel = mongoose.model('Donor', new mongoose.Schema(schema));

function jsonifier(persistedData) {
    const jsonModel = {};

    jsonModel.id = persistedData.id;
    Object.keys(schema).forEach((field) => {
        jsonModel[field] = persistedData[field];
    });
    jsonModel.ip = persistedData.ip;

    return jsonModel;
}

module.exports = {
    DonorModel: mongooseModel,
    DONOR_REST_FIELDS: [
        'firstName', 'lastName', 'contactNo', 'email', 'bloodGroup', 'longitude', 'latitude'
    ],
    DONOR_CREATE_EVENT: 'create',
    DONOR_DELETE_EVENT: 'delete',
    jsonifier
};
