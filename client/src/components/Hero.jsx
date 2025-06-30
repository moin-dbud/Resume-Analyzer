import { motion } from "framer-motion";
import { FaArrowRight, FaFileUpload } from "react-icons/fa";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <section className="bg-white min-h-[90vh] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-10">
      {/* Left Side - Text */}
      <motion.div
        className="flex flex-col gap-6 max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Let AI Review & Improve Your Resume
        </motion.h1>

        <p className="text-gray-600 text-lg">
          Upload your resume and get intelligent, real-time feedback on formatting, skills, keywords, and more. Designed to help you pass ATS filters and impress recruiters.
        </p>

        <div className="flex gap-4 mt-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg flex items-center gap-2 hover:bg-blue-700 transition " >
            <FaFileUpload /> <a href="#upload">Upload Resume</a>
          </button>
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full text-lg flex items-center gap-2 hover:bg-blue-50 transition">
            <a href="#how-it-works">How It Works</a> <FaArrowRight />
          </button>
        </div>
      </motion.div>

      {/* Right Side - Illustration */}
      {/* <a href="https://storyset.com/social-media">Social media illustrations by Storyset</a> */}
      <motion.img
        src={assets.hero}
        alt="Resume Illustration"
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />
    </section>
  );
};

export default Hero;
