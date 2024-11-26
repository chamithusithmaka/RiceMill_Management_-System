
const express = require("express");
const User = require("../models/loginModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// Utility function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, '200212803989', {
    expiresIn: "30d",
  });
};

// Route for user registration
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all required fields are present
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }

    // Check if a user with the same email exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Check if a user with the same username exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const user = await newUser.save();

    // Respond with user data and a token
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all required fields are present
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Respond with user data and a token
    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
