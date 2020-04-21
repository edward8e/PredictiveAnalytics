const mongoose = require('mongoose');
const { Schema } = mongoose;

const analyticResultSchema = new Schema({
  itemName: String,
  r2: String,
  Sunday: String,
  Monday: String,
  Tuesday: String,
  Wednesday: String,
  Thursday: String,
  Friday: String,
  Saturday: String,
  _user: { type: Schema.Types.ObjectId, ref: 'users' },
  dateCreated: Date,
  dateUpdated: Date
});

mongoose.model('analyticResult', analyticResultSchema);