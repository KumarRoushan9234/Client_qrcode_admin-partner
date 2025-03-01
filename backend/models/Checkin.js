import mongoose from "mongoose";

const CheckinSchema = new mongoose.Schema({
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Checkin", CheckinSchema);
