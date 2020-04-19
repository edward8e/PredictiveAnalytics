const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuItemSchema = new Schema({
  itemName: String,
  sold: { type: Number, default: 0 },
  refunded: { type: Number, default: 0 },
  grossSales: { type: Number, default: 0 },
  discounts: { type: Number, default: 0 },
  refunds: { type: Number, default: 0 },
  netSales: { type: Number, default: 0 },
  netSalesPer: { type: Number, default: 0 },
  avgNetSales: { type: Number, default: 0 },
  cogs: { type: Number, default: 0 },
  dayOfWeek:{ type: Number, default: 0 },
  weekend:{ type: Number, default: 0 },
  weekOfMonth: { type: Number, default: 0 },
  dayTemp: { type: Number, default: 0 },
  grossProfit: { type: Number, default: 0 },
  date: String,
  _user: { type: Schema.Types.ObjectId, ref: 'users' },
  dateCreated: Date,
  dateUpdated: Date
});

mongoose.model('menuItems', menuItemSchema);