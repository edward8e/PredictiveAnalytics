const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  categoryName: String,
  active: {type: Boolean, default: true},
  description: String,
  _user: { type: Schema.Types.ObjectId, ref: 'users' },
  dateCreated: Date,
  dateUpdated: Date
});

mongoose.model('categories', categorySchema);