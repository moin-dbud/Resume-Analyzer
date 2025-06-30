import { motion } from "framer-motion";
import { FaUpload, FaBrain, FaFileDownload } from "react-icons/fa";

const steps = [
  {
    icon: <FaUpload className="text-blue-600 text-3xl" />,
    title: "Upload Resume",
    description:
      "Upload your PDF resume file securely. Our parser extracts all relevant information for analysis.",
  },
  {
    icon: <FaBrain className="text-green-600 text-3xl" />,
    title: "AI Feedback",
    description:
      "Our AI analyzes your resume and gives detailed feedback on formatting, keywords, skills, and more.",
  },
  {
    icon: <FaFileDownload className="text-purple-600 text-3xl" />,
    title: "Download Report",
    description:
      "View your resume insights instantly and download a professional feedback PDF with suggestions.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-gray-50 py-16 px-6 md:px-20">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How It Works
      </motion.h2>

      <div className="grid gap-10 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
