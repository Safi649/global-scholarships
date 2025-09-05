// 📁 pages/contact.js
import Layout from '../components/layout';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Contact Us</h1>
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
                You can also send a direct message using the form. All messages will be received at our email: 
                <strong> muhammadabbassafi332@gmail.com</strong>
              </p>
            </div>

            {/* Contact Form */}
            <form
              action="https://formspree.io/f/maylnwqe" // 🔑 Replace with your Formspree form ID
              method="POST"
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={6}
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
