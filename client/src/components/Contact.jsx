import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_52lvuqe",      // Replace with your actual EmailJS Service ID
        "template_zn3dyon",     // Replace with your actual Template ID
        form.current,
        "jhhgOk86KKIunm_0E"       // Replace with your Public API Key
      )
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
        },
        (error) => {
          console.error("❌ Failed to send message:", error.text);
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <section id="contact" className="py-16 px-6 md:px-20 bg-white">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Us
      </motion.h2>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-xl shadow-md space-y-6"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="user_name"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="user_email"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            name="message"
            rows="5"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full font-medium"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {success && (
          <p className="text-green-600 text-center font-medium mt-4">
            ✅ Your message has been sent!
          </p>
        )}
      </form>
    </section>
  );
};

export default Contact;
