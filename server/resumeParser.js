const fs = require("fs");
const pdfParse = require("pdf-parse");

const resumeParser = async (req, res) => {
  try {
    if (!req.files || !req.files.resume) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const file = req.files.resume;
    const tempPath = `${__dirname}/temp-${Date.now()}.pdf`;

    // Move file temporarily
    await file.mv(tempPath);

    // Read and parse
    const dataBuffer = fs.readFileSync(tempPath);
    const parsed = await pdfParse(dataBuffer);

    // Clean up file
    fs.unlinkSync(tempPath);

    res.status(200).json({ text: parsed.text });
  } catch (error) {
    console.error("❌ Error parsing resume:", error);
    res.status(500).json({ error: "Failed to parse resume." });
  }
};

module.exports = resumeParser;
