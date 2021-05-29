const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // creates index for username field in username's collection
    lowerCase: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['regular', 'admin'],
    default: 'regular',
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;