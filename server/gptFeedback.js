const { GoogleGenerativeAI } = require("@google/generative-ai");
const Resume = require("./models/Resume"); // ✅ Import model
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const gptFeedback = async (req, res) => {
  try {
    const { resumeText, userId } = req.body; // ✅ get userId

    if (!resumeText || resumeText.trim() === "") {
      return res.status(400).json({ error: "Resume text is empty." });
    }

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    const prompt = `
Act as a professional resume reviewer.

Evaluate the resume below and respond in this strict JSON format:
{
  "rating": "<Excellent/Good/Fair/Poor>",
  "suggestions": [
    "First suggestion to improve...",
    "Second suggestion...",
    ...
  ],
  "feedback": "Markdown-formatted explanation about what's good, what's missing, and how to improve."
}

Resume:
${resumeText}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonStart = responseText.indexOf("{");
    const jsonEnd = responseText.lastIndexOf("}") + 1;
    const jsonString = responseText.substring(jsonStart, jsonEnd);

    let data;
    try {
      data = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("❌ Failed to parse JSON from Gemini:", parseError);
      return res.status(500).json({ error: "Gemini response was malformed." });
    }

    // ✅ Save to MongoDB
    const newAnalysis = new Resume({
      userId,
      resumeText,
      feedback: data.feedback || "",
      rating: data.rating || "No rating found",
      suggestions: data.suggestions || [],
    });

    await newAnalysis.save();

    return res.status(200).json({
      rating: newAnalysis.rating,
      suggestions: newAnalysis.suggestions,
      feedback: newAnalysis.feedback,
    });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({ error: "Failed to analyze with Gemini AI." });
  }
};

module.exports = gptFeedback;
