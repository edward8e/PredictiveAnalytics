const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    businessName: String,
    email: String,
    settings: {
        deliveryMinimum: Number,
        deliveryDistance: Number,
        baseDeliveryCharge: Number,
        baseDeliveryChargeMiles: Number,
        perMileCharge: Number,
        pickupMinimum: Number,
        phoneNumbers: String,
        taxRate: String
    },
    dateCreated: Date,
    dateUpdated: Date
});

mongoose.model('businesses', categorySchema);