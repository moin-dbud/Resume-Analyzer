import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">Resume Analyzer</h2>
          <p className="text-gray-400 text-sm mt-1">
            Empowering your resume with AI. Built by Moin Sheikh.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-gray-400">
          <a
            href="https://github.com/moin-dbud"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white text-xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/moin-sameer-sheikh-2a7690335/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white text-xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:moinsheikh1303@gmail.com"
            className="hover:text-white text-xl"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} Resume Analyzer. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
