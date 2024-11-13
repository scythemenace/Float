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

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId(),
    ref: "User",
    required: true,
  },

  /*The reason we use numbers instead of decimal points to represent dollars is that floating points are stored in some binary format
   * which may lead to some rounding errors when doing some calculation. In order to avoid this we use integers to store the account balance.
   * Therefore, when we need to store a value in the database, we multiply it by 100 (the standard precision support for canada) and store it in the database.
   * Alternatively, when we need to fetch the value from the database, we divide by it by 100 and display the value*/

  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
