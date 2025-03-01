import express from "express";
import {
  signup,
  login,
  googleLogin,
  sendVerificationEmail,
  resetPassword,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/send-verification-email", sendVerificationEmail);
router.post("/reset-password", resetPassword);
router.post("/logout", logout);

export default router;
