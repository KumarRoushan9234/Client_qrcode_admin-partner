import express from "express";
import { checkInUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/check-in", checkInUser);

export default router;
