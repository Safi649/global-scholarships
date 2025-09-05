import { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";

export default function Review() {
  const [formData, setFormData] = useState({ name: "", email: "", rating: "5", message: "" });
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("✅ Thank you for your review!");
    setFormData({ name: "", email: "", rating: "5", message: "" });
  };

  return (
    <Layout>
      <Head>
        <title>Review / Rate Us | Global Scholarships</title>
        <meta
          name="description"
          content="Share your feedback or rate Global Scholarships to help us improve our website and services."
        />
      </Head>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-12">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Review / Rate Us
        </h1>

        {success && <p className="mb-4 text-green-600 font-medium bg-green-100 px-4 py-2 rounded-lg">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Rating</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
              <option value="4">⭐⭐⭐⭐ 4 - Good</option>
              <option value="3">⭐⭐⭐ 3 - Average</option>
              <option value="2">⭐⭐ 2 - Poor</option>
              <option value="1">⭐ 1 - Terrible</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </Layout>
  );
}
