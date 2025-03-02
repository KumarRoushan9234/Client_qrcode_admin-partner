import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { checkAuth } from "../middleware/authMiddleware.js";

dotenv.config();

const router = express.Router();

// Setup Email Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Send email verification
    const verificationLink = `https://yourfrontend.com/verify-email?email=${email}`;
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Click the link to verify your email: ${verificationLink}`,
    });

    res.status(201).json({ message: "User registered successfully, check your email for verification" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout Route (Placeholder, JWT removal on client side is enough)
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// Update User Info Route
router.put("/update-info", checkAuth, async (req, res) => {
  const { name, email, phone, profilePicture } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, phone, profilePicture },
      { new: true }
    );
    res.json({ message: "User info updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reset Password Route
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const resetLink = `https://yourfrontend.com/reset-password?email=${email}`;
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Reset Password",
      text: `Click the link to reset your password: ${resetLink}`,
    });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Email Verification Route
router.get("/verify-email", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.emailVerified = true;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
