const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  items: [
    {
      amount: Number,
      note: String,
      menuItem: { type: Schema.Types.ObjectId, ref: "menuItems" }
    }
  ],
  cateringType: String,
  notes: String,
  stripeID: String,
  checkoutID: String,
  paymentStatus: String,
  total: {
    subtotal: Number,
    delivery: Number,
    serviceCharge: Number,
    options: [{option: String, amount: Number, total: Number}],
    taxes: Number,
    total: Number
  },
  date: Date,
  time: Date,
  options: [String],
  status: String,
  address: {
    distance: Number,
    address_components: [{ long_name: String, shortname: String, types: [String] }],
    formatted_address: String,
    geometry: {
      bounds: {
        south: Number,
        west: Number,
        north: Number,
        east: Number
      },
      location: {
        lat: Number,
        lng: Number
      },
      location_type: String,
      viewport: {
        south: Number,
        west: Number,
        north: Number,
        east: Number
      }
    },
    place_id: String,
    types: [String]
  },
  dateCreated: Date,
  dateUpdated: Date
});

mongoose.model("orders", orderSchema);
