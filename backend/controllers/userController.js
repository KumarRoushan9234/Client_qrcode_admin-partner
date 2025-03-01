import User from "../models/userModel.js";

export const checkInUser = async (req, res) => {
  const { userId, partnerId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.checkInHistory.push({ partnerId, timestamp: new Date() });
    await user.save();

    res.json({ message: "Check-in successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
