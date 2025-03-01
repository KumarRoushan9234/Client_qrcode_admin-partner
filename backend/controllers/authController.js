import admin from "../config/firebaseConfig.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Setup Email Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// 🔹 **User Signup (Email & Password)**
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
      emailVerified: false,
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firebaseUid: userRecord.uid,
      name,
      email,
      password: hashedPassword,
      emailVerified: false,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 **Login User**
export const login = async (req, res) => {
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
};

// 🔹 **Google Login**
export const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    let user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      user = new User({
        firebaseUid: decodedToken.uid,
        name: decodedToken.name,
        email: decodedToken.email,
        profilePicture: decodedToken.picture,
        emailVerified: decodedToken.email_verified,
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Google login successful", token: jwtToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔹 **Email Verification**
export const sendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const verificationLink = `https://yourfrontend.com/verify-email?email=${email}`;
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Click the link to verify your email: ${verificationLink}`,
    });

    res.json({ message: "Verification email sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 **Reset Password**
export const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const link = await admin.auth().generatePasswordResetLink(email);
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Reset Password",
      text: `Click the link to reset your password: ${link}`,
    });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 **Logout (Placeholder)**
export const logout = (req, res) => {
  res.json({ message: "Logged out successfully" });
};
