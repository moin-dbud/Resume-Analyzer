const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const resumeParser = require("./resumeParser");
const gptFeedback = require("./gptFeedback");
const Resume = require("./models/Resume");
const User = require("./models/User"); // ✅ Add this
require("dotenv").config();


const app = express();
const PORT = 5000;

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());

// ✅ Register routes
app.post("/upload", resumeParser);
app.post("/analyze", gptFeedback);
app.post("/user", async (req, res) => {
  const { userId, fullName, email } = req.body;

  if (!userId || !email) {
    return res.status(400).json({ error: "Missing required user fields" });
  }

  try {
    const existingUser = await User.findOne({ userId });

    if (!existingUser) {
      const newUser = new User({ userId, fullName, email });
      await newUser.save();
      console.log("✅ New user saved:", email);
    } else {
      console.log("ℹ️ User already exists:", email);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Failed to sync user:", error);
    res.status(500).json({ error: "Failed to sync user to database" });
  }
});

// ✅ Import and use auth route for saving user data
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// ✅ Fetch history by user ID
app.get("/history/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const history = await Resume.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error("❌ Failed to fetch history:", error);
    res.status(500).json({ error: "Failed to fetch analysis history." });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
