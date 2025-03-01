import admin from "../config/firebaseConfig.js";
import Partner from "../models/partnerModel.js";

export const partnerLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const { uid, email } = decoded;

    const partner = await Partner.findOne({ firebaseUid: uid });

    if (!partner) {
      return res.status(403).json({ message: "Access denied. Not a registered partner." });
    }

    res.status(200).json({ message: "Partner authenticated", partner });
  } catch (error) {
    res.status(401).json({ message: "Invalid Token", error });
  }
};
