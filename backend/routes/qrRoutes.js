import express from "express";
import { generateQRCode } from "../controllers/qrController.js";

const router = express.Router();

router.post("/generate", generateQRCode);

export default router;
