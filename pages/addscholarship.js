import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { FiBook, FiMapPin, FiAward } from "react-icons/fi";

export default function AddScholarship() {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [university, setUniversity] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "scholarships"), {
        title,
        country,
        university,
        createdAt: serverTimestamp(),
      });
      router.push("/scholarships");
    } catch (error) {
      console.error("Error adding scholarship:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Add New Scholarship</h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg shadow-inner px-3 py-2">
            <FiBook className="text-blue-500 text-xl" />
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Scholarship Title"
              className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Country */}
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg shadow-inner px-3 py-2">
            <FiMapPin className="text-green-500 text-xl" />
            <input
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* University */}
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg shadow-inner px-3 py-2">
            <FiAward className="text-yellow-500 text-xl" />
            <input
              type="text"
              required
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="University"
              className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all"
          >
            {loading ? "Adding..." : "Add Scholarship"}
          </button>
        </form>
      </div>
    </div>
  );
}
