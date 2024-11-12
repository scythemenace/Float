const express = require("express");
const User = require("../db/dbSchema");
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

  const user = new User({
    username: body.username,
    firstName: body.firstName,
    lastName: body.lastName,
    password: hashedPassword,
  });

  await user.save();

  const userId = user._id;
  const token = jwt.sign({ userId: userId }, JWT_SECRET);

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
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password,
    );

    if (isPasswordCorrect) {
      const token = jwt.sign({ username: userExists.username }, JWT_SECRET);

      return res.status(200).json({
        token: token,
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

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: { $regex: filter },
      },
      {
        lastName: { $regex: filter },
      },
    ],
  });

  res.status(200).json({
    user: users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
