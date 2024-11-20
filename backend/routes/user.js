const express = require("express");
const { User } = require("../db/dbSchema");
const { Account } = require("../db/dbSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Computation required
const JWT_SECRET = require("../config/jwt_secret");

const router = express.Router();

const { signUpValidator } = require("../config/input_validation");
const { signInValidator } = require("../config/input_validation");
const { updateValidator } = require("../config/input_validation");

const { authMiddleware } = require("../middlewares/user");

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedOutput = signUpValidator.safeParse(body);

  if (!parsedOutput.success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const userExists = await User.findOne({ username: body.username });

  if (userExists) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const hashedPassword = await bcrypt.hash(body.password, saltRounds);

  //Creating the user
  const user = new User({
    username: body.username,
    firstName: body.firstName,
    lastName: body.lastName,
    password: hashedPassword,
  });

  await user.save();

  const userId = user._id;
  const token = jwt.sign({ userId: userId }, JWT_SECRET);

  const random_balance = Math.random() * 10000 + 1;

  //Creating a random account balance in order to simulate some person creating an account in the bank
  const account = new Account({
    userId: userId,
    balance: random_balance,
  });

  await account.save();

  return res.status(200).json({
    message: "User created successfully",
    token: token,
    firstName: user.firstName,
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const parsedOutput = signInValidator.safeParse(body);

  if (!parsedOutput.success) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const userExists = await User.findOne({
    username: body.username,
  });

  if (userExists) {
    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      userExists.password,
    );

    if (isPasswordCorrect) {
      const token = jwt.sign({ userId: userExists._id }, JWT_SECRET);

      return res.status(200).json({
        message: "Logged in successfully",
        token: token,
        firstName: userExists.firstName,
      });
    } else {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
  } else {
    return res.status(411).json({
      message: "Error while loggin in",
    });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const parsedOutput = updateValidator.safeParse(req.body);
  if (!parsedOutput.success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  const { password, firstName, lastName } = req.body;

  const userExists = await User.findOne({
    _id: req.userId,
  });

  /*Manual mapping done on purpose, if we use .map() then somebody code maliciously update settings we don't want them
   * to update*/

  if (password) {
    const isSame = await bcrypt.compare(password, userExists.password);
    if (isSame) {
      return res.status(400).json({
        message: "New password cannot be the same as the old password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (userExists) {
      userExists.password = hashedPassword;
    }
  }

  if (firstName) {
    userExists.firstName = firstName;
  }

  if (lastName) {
    userExists.lastName = lastName;
  }

  await userExists.save();

  return res.status(200).json({
    message: "Updated Successfully",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  // We don't want the user getting free access to the whole user list
  if (filter == "") {
    return res.status(200).json({
      user: [],
    });
  }

  const filterTerms = filter.split(" ").filter((term) => term);

  const users = await User.find({
    $and: filterTerms.map((term) => ({
      $or: [
        { firstName: { $regex: term, $options: "i" } },
        { lastName: { $regex: term, $options: "i" } },
      ],
    })),
  });

  const return_users = users.filter((user) => {
    if (!(user._id == req.userId)) {
      return user;
    }
  });

  res.status(200).json({
    user: return_users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
