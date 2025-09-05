// pages/review.js
import { useState } from "react";
import Layout from "../components/Layout";

export default function Review() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">Rate Us</h1>
        <p className="mb-4">
          We’d love to hear your feedback! Please leave a rating and share your
          thoughts about Global Scholarships.
        </p>

        {/* Rating stars */}
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-3xl ${
                star <= rating ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Feedback box */}
        <textarea
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-indigo-500"
          placeholder="Write your feedback here..."
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={() => {
            alert(
              `Thank you for your feedback!\nRating: ${rating} Stars\nMessage: ${message}`
            );
            setRating(0);
            setMessage("");
          }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition"
        >
          Submit Feedback
        </button>
      </div>
    </Layout>
  );
}
