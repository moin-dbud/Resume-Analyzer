import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaFilePdf, FaUpload } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import axios from "axios";
import { marked } from "marked";
import html2pdf from "html2pdf.js";
import { useAppContext } from "../context/AppContext";
import { useUser } from "@clerk/clerk-react"; // ✅ Add this line


const Upload = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [suggestionCount, setSuggestionCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const feedbackRef = useRef(null);
  const { isSignedIn, user } = useUser();



  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      setExtractedText("");
      setFeedback("");
      setRating("");
      setSuggestionCount(0);
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const handleUpload = async () => {
    if (!isSignedIn) {
      alert("Please log in to analyze your resume.");
      return;
    }

    if (!file) return alert("Please select a PDF resume.");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setExtractedText(res.data.text);
    } catch (error) {
      console.error("❌ Error uploading resume:", error);
      alert("Failed to upload or analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const analyzeWithGPT = async () => {
  if (!user) {
    alert("Please log in to analyze your resume.");
    return;
  }

  try {
    setAiLoading(true);
    const res = await axios.post("http://localhost:5000/analyze", {
      resumeText: extractedText,
      userId: user.id,
    });

    setFeedback(res.data.feedback || "No feedback generated.");
    setRating(res.data.rating || "No rating found");
    setSuggestionCount(res.data.suggestions?.length || 0);
  } catch (error) {
    console.error("❌ GPT analysis failed:", error);
    alert("AI feedback generation failed.");
  } finally {
    setAiLoading(false);
  }
};



  const handleDownload = () => {
    if (!feedback) return;

    // Prepare plain HTML with no Tailwind or oklch colors
    const safeHTML = `
    <div style="font-family: Arial, sans-serif; color: #000; padding: 20px; line-height: 1.6; font-size: 14px;">
      ${marked(feedback)}
      <p style="margin-top: 20px; font-weight: bold;">Feedback Rating: ${rating} | Suggestions: ${suggestionCount}</p>
    </div>
  `;

    const element = document.createElement("div");
    element.innerHTML = safeHTML;
    document.body.appendChild(element);

    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: "Resume_Feedback.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save()
      .then(() => document.body.removeChild(element))
      .catch((err) => {
        console.error("❌ PDF Generation Error:", err);
        alert("PDF download failed. Please try again.");
      });
  };

  return (
    <motion.section id="upload"
      className="max-w-3xl mx-auto mt-10 px-6 py-10 bg-white rounded-xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Upload Your Resume
      </h2>

      {!isSignedIn && (
  <div className="mb-4 p-4 rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-800 text-sm font-medium">
    ⚠️ You must <span className="font-semibold">log in</span> to analyze your resume and get AI feedback.
  </div>
)}


      {/* File Upload */}
      <label
        htmlFor="resume-upload"
        className="border-2 border-dashed border-blue-400 bg-blue-50 hover:bg-blue-100 cursor-pointer rounded-xl p-6 text-center flex flex-col items-center gap-2 transition"
      >
        <FaFilePdf className="text-4xl text-blue-600" />
        <p className="text-gray-700">Click or Drag & Drop to Upload PDF</p>
        {file && <p className="text-sm text-green-700 mt-1">✅ {file.name}</p>}
        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || loading || !isSignedIn}
        className={`mt-6 w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
          !isSignedIn
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <FaUpload />
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {/* AI Feedback Button */}
      {extractedText && !feedback && (
        <button
          onClick={analyzeWithGPT}
          disabled={aiLoading}
          className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
        >
          {aiLoading ? "Generating AI Feedback..." : "Get AI Feedback"}
        </button>
      )}

      {/* Extracted Resume Text */}
      {extractedText && (
        <motion.div
          className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-300 text-gray-700 whitespace-pre-wrap text-sm max-h-64 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <strong>Extracted Resume Text:</strong>
          <br />
          {extractedText}
        </motion.div>
      )}

      {/* AI Suggestions and Feedback */}
      {feedback && (
        <>
          <div ref={feedbackRef} className="max-w-none mt-6">
            <div dangerouslySetInnerHTML={{ __html: marked(feedback) }} />
            <p className="mt-4 text-gray-800 font-semibold">
              Feedback Rating: {rating} | Suggestions: {suggestionCount}
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
          >
            <MdDownload className="text-lg" />
            Download Feedback as PDF
          </button>
        </>
      )}
    </motion.section>
  );
};

export default Upload;
