const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userRequest = require("../models/user");

dotenv.config();

const userRouter = express.Router();

// JWT Token Generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Route for Save a new user request
userRouter.post("/", async (req, res) => {
  try {
    const { FirstName, LastName, UserName, Password, PhoneNumber } = req.body;

    // Check for all required fields
    if (!FirstName || !LastName || !UserName || !Password || !PhoneNumber) {
      return res.status(400).json({
        message: "All fields (FirstName, LastName, UserName, Password, PhoneNumber) are required",
      });
    }

    // Check if the username already exists
    const existingUser = await userRequest.findOne({ UserName });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create a new user
    const newUserRequest = await userRequest.create({
      FirstName,
      LastName,
      UserName,
      Password: hashedPassword,
      PhoneNumber,
    });

    return res.status(201).json(newUserRequest);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route for Get All user requests from database
userRouter.get("/", async (req, res) => {
  try {
    const allUserRequests = await userRequest.find({});
    res.status(200).json({
      count: allUserRequests.length,
      data: allUserRequests,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route for Get One user request from database by ID
userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userRequestData = await userRequest.findById(id);

    if (!userRequestData) {
      return res.status(404).json({ message: "User Request not found" });
    }

    res.status(200).json(userRequestData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route for Update a user request
userRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { FirstName, LastName, UserName, Password, PhoneNumber } = req.body;

    // Check for required fields
    if (!FirstName || !LastName || !UserName || !Password || !PhoneNumber) {
      return res.status(400).json({
        message: "All fields (FirstName, LastName, UserName, Password, PhoneNumber) are required",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const updatedUserRequest = await userRequest.findByIdAndUpdate(
      id,
      {
        FirstName,
        LastName,
        UserName,
        Password: hashedPassword,
        PhoneNumber,
      },
      { new: true }
    );

    if (!updatedUserRequest) {
      return res.status(404).json({ message: "User Request not found" });
    }

    res.status(200).json({
      message: "User Request updated successfully",
      data: updatedUserRequest,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route for Delete a user request
userRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUserRequest = await userRequest.findByIdAndDelete(id);

    if (!deletedUserRequest) {
      return res.status(404).json({ message: "User Request not found" });
    }

    res.status(200).json({ message: "User Request deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route for Login
userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await userRequest.findOne({ UserName: username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate a token and respond
    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      username: user.UserName,
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = userRouter;
