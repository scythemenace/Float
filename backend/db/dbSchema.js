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
    trim: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
