import QRCode from "qrcode";
import Partner from "../models/partnerModel.js";

export const generateQRCode = async (req, res) => {
  const { partnerId } = req.body;
  try {
    const partner = await Partner.findById(partnerId);
    if (!partner) return res.status(404).json({ error: "Partner not found" });

    const qrData = JSON.stringify({ partnerId: partner._id, name: partner.name });
    const qrImage = await QRCode.toDataURL(qrData);

    res.json({ qrImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
