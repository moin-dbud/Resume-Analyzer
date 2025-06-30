import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.section
      className="min-h-screen bg-white py-16 px-6 md:px-20 text-gray-800"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          About Resume Analyzer
        </h1>

        <p className="text-lg leading-8 mb-6">
          Resume Analyzer is an AI-powered platform designed to help job seekers craft stronger resumes that stand out in today's competitive job market. We use cutting-edge technologies like natural language processing and machine learning (via Gemini API) to provide real-time, intelligent feedback on your resume content.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">✨ What We Offer</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Instant resume analysis with feedback on formatting, clarity, and relevance.</li>
          <li>Suggestions to optimize your resume for ATS (Applicant Tracking Systems).</li>
          <li>AI-generated insights on skill gaps, grammar issues, and content quality.</li>
          <li>Downloadable, PDF-formatted feedback with improvement tips.</li>
          <li>Personalized experience with login support and analysis history.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">🧠 Powered By AI</h2>
        <p className="mb-6">
          Our resume analyzer uses Google's Gemini AI model to scan, interpret, and evaluate your resume. The feedback you receive is context-aware and tailored to help you improve content, language, structure, and overall impact.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">👨‍💻 Built By</h2>
        <p className="mb-6">
          This project is built by <strong>Moin Sheikh</strong>, an aspiring AI and Web Developer, passionate about building intelligent systems and clean user experiences. This tool combines modern frontend technologies like <strong>React, Tailwind CSS, Framer Motion</strong> with robust backend capabilities using <strong>Node.js, MongoDB, and Gemini AI</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">🔒 Privacy & Security</h2>
        <p className="mb-6">
          We respect your privacy. Your uploaded resumes are never shared with third parties and are stored securely for your convenience (only if you’re logged in). You can also download your analysis anytime in PDF format.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">📫 Get In Touch</h2>
        <p>
  Have questions, feedback, or suggestions? Feel free to{" "}
  <a href="/#contact" className="text-blue-600 hover:underline">contact us</a>{" "}
  or email directly at <a href="mailto:moinsheikh1303@gmail.com" className="text-black-600 font-bold " >moinsheikh1303@gmail.com</a>.
</p>

      </div>
    </motion.section>
  );
};

export default AboutUs;
