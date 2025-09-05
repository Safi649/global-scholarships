// 📁 pages/contact.js
import { useState } from "react";
import Layout from "../components/layout";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
            Contact Us
          </h1>
          <p className="text-center text-gray-700 mb-10">
            Have questions, feedback, or want to share something? Fill out the form below and we will get back to you as soon as possible.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-gray-700">
                <FaEnvelope className="text-blue-600 text-xl" />
                <span>muhammadabbassafi332@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FaPhone className="text-blue-600 text-xl" />
                <span>+92 348 9085366</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
                <span>Swabi, KPK, Pakistan</span>
              </div>
              <p className="text-gray-600 mt-4 leading-relaxed">
                All messages are stored securely and you can check them in your Firebase Firestore collection <strong>"messages"</strong>.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {success && (
                <p className="text-green-600 font-semibold">
                  Message sent successfully!
                </p>
              )}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition w-full"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
