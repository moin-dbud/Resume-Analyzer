const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  resumeText: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  suggestions: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);
