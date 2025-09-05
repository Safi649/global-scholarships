// pages/review.js
import { useState, useEffect } from "react";
import Head from "next/head";
import { db, auth } from "../firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Review() {
  const [user] = useAuthState(auth);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: "", comment: "", rating: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  const handleStarClick = (star) => {
    setFormData({ ...formData, rating: star });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to submit a review.");
      return;
    }
    if (formData.rating === 0) {
      alert("Please select a star rating.");
      return;
    }
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        ...formData,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      // Append the new review to the end
      setReviews([...reviews, { ...formData, id: docRef.id }]);
      setFormData({ name: "", comment: "", rating: 0 });
    } catch (err) {
      console.error("Error submitting review:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Review & Rate Us | Global Scholarships</title>
        <meta name="description" content="Leave a review or rating for Global Scholarships." />
      </Head>

      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
            Review & Rate Us
          </h1>

          {/* Review Form */}
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-12">
            <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder={user?.displayName || "Your Name"}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Comment</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Write your review..."
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Rating</label>
                <div className="flex space-x-2 text-2xl cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleStarClick(star)}
                      className={star <= formData.rating ? "text-yellow-400" : "text-gray-300"}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>

          {/* Display Reviews */}
          <div className="grid grid-cols-1 gap-6">
            {reviews.length === 0 ? (
              <p className="text-center text-gray-600">No reviews yet. Be the first to review!</p>
            ) : (
              reviews
                .sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0)) // oldest first
                .map((rev) => (
                  <div key={rev.id} className="bg-white p-4 rounded-xl shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{rev.name}</h3>
                      <span className="text-yellow-400 font-bold">{rev.rating} ★</span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{rev.comment}</p>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
