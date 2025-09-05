// pages/contact.js
import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Head from "next/head";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (res.ok) {
        setFeedback("✅ Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFeedback(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setFeedback("❌ Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact | Global Scholarships</title>
        <meta name="description" content="Contact Global Scholarships for inquiries, suggestions, or reporting an issue. Send us a message and we'll get back to you." />
        <link rel="canonical" href="https://global-scholarships.netlify.app/contact" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Contact Us</h1>
          <p className="text-center text-gray-700 mb-10">Have questions or feedback? Send us a message and we'll get back to you.</p>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-gray-700"><FaEnvelope className="text-blue-600 text-xl" /><span>muhammadabbassafi332@gmail.com</span></div>
              <div className="flex items-center gap-3 text-gray-700"><FaPhone className="text-blue-600 text-xl" /><span>+92 348 9085366</span></div>
              <div className="flex items-center gap-3 text-gray-700"><FaMapMarkerAlt className="text-blue-600 text-xl" /><span>Swabi, KPK, Pakistan</span></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {feedback && <p className="text-center text-green-600 font-semibold">{feedback}</p>}
              <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500" />
              <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500" />
              <input type="text" name="subject" placeholder="Subject" required value={formData.subject} onChange={handleChange} className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500" />
              <textarea name="message" placeholder="Your Message" required rows={6} value={formData.message} onChange={handleChange} className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500"></textarea>
              <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition w-full">{loading ? "Sending..." : "Send Message"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
