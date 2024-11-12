const express = require("express");
const User = require("../db/dbSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Computation required
const JWT_SECRET = require("../config/jwt_secret");

const router = express.Router();

const signUpValidator = require("../config/input_validation");
const signInValidator = require("../config/input_validation");

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

  const hashedPassword = bcrypt.hash(password, saltRounds);

  const user = new User({
    username: body.username,
    firstName: body.firstName,
    lastName: body.lastName,
    password: hashedPassword,
  });

  const token = jwt.sign({ username: body.username }, JWT_SECRET);
  user.token = token;

  await user.save();

  return res.status(200).json({
    message: "User created successfully",
    token: token,
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
    const isPasswordCorrect = bcrypt.compare(password, userExists.password);
    if (isPasswordCorrect) {
      return res.status(200).json({
        token: userExists.token,
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
    username: req.userId,
  });

  if (password) {
    const hashedPassword = bcrypt.hash(password, saltRounds);
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

module.exports = router;
