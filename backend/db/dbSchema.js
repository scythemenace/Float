const mongoose = require("mongoose");
const uri = require("../config/mongoDBURI");

mongoose.connect(uri);

// Define Schema

// User

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 6,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 50,
  },
  token: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
