const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    googleId: { type: String, default: null },
    credits: { type: Number, default: 0 },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    business: { type: Schema.Types.ObjectId, ref: "businesses" },
    password: { type: String, default: null },
    accountType: { type: String, default: 'users' },
    validated: {type: Boolean, default: false},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    validateAccountToken: String,
});

userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userSchema.methods.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password,hash);
};

mongoose.model('users', userSchema);