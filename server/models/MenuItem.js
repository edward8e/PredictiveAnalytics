const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuItemSchema = new Schema({
  itemName: String,
  active: {type: Boolean, default: true},
  description: String,
  category: { type: Schema.Types.ObjectId, ref: 'categories' },
  price: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'users' },
  dateCreated: Date,
  dateUpdated: Date
});

mongoose.model('menuItems', menuItemSchema);