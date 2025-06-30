const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { clerkId, name, email } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = new User({ clerkId, name, email });
      await user.save();
    }

    res.status(200).json({ message: "User registered", user });
  } catch (err) {
    console.error("❌ Error registering user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
