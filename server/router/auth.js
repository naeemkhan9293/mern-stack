const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const mongoose = require("mongoose");

const SECRET_KEY = "kjdfljlsdfjsldfsdlfjsdlkfjklsdfjdklfjlksf$5";

// Route 1: createuser route
router.post(
  "/createuser",
  // validating the user input come to the server
  [
    body("name", "Enter the name atleast 5 character").isLength({ min: 5 }),
    body("email", "Enter the valid email").isEmail(),
    body("password").isLength({ min: 4 }),
  ],
  async (req, res) => {
    let success = false;
    // checking wether error exist or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check wether user alredy exist or not
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "sorry a user with this email is already exist",
        });
      }

      //hashing the password
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      // finally create user if user does't exist
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      res.json({ success: true, message: "your account  been registerd" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internl server error" });
    }
  }
);

// -------------------------------------------------------
// Route 2: login routes
router.post(
  "/login",
  // validating the user input come to the server
  [
    body("email", "Enter the valid email").isEmail(),
    body("password", "password should not be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // checking wether error exist or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      const verifyPass = await bcrypt.compare(password, user.password);

      // if user email or password is incorrect
      if (!user && !verifyPass) {
        res
          .status(400)
          .json({ success, error: "Please enter the correct credentail" });
      }

      const data = {
        user: {
          user: user.id,
        },
      };
      const authToken = jwt.sign(data, SECRET_KEY);
      res.json({ success:true, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Route 3: authenticate user using jwt token
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user.user);
    const user = await User.findById(userId).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
