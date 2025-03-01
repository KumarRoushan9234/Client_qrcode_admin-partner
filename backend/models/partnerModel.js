import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Partner = mongoose.model("Partner", partnerSchema);
export default Partner;
