const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'The name has been used. Please use a new one.'],
    required: [true, 'A user must have a name.'],
  },
  email: {
    type: String,
    unique: [true, 'The email has been used. Please use a new one.'],
    required: [true, 'A user must have an email.'],
    // To have db convert to lowercase before storing
    lowercase: true,
    // Use third party library for email validation
    validate: [validator.isEmail, 'A valid email is required.'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password.'],
    minlength: [8, 'Password must be at least 8 characters.'],
    maxlength: [40, 'Password cannot exceed 40 characters.'],
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpiry: Date, // Propose 1 hour after token sent out.
  lastLoginAt: Date,
  preferredLanguage: String,
  paidAmount: {
    type: Number,
    select: false,
  },
  totalPaidAmount: {
    type: Number,
    select: false,
  },
  membershipValidUntil: Date,
  ageVerified: Boolean,
  blacklisted: Boolean,
  createdCategories: Array,
  savedCategories: Array,
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
