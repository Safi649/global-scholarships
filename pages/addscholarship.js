import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { FiBook, FiMapPin, FiGlobe, FiInfo, FiCalendar } from "react-icons/fi";

export default function AddScholarship() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [hostCountry, setHostCountry] = useState("");
  const [details, setDetails] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "scholarships"), {
        name,
        country,
        hostCountry,
        details,
        deadline,
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
          {/* Name of Scholarship */}
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg shadow-inner px-3 py-2">
            <FiBook className="text-blue-500 text-xl" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of Scholarship"
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

          {/* Host Country */}
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg shadow-inner px-3 py-2">
            <FiGlobe className="text-purple-500 text-xl" />
            <input
              type="text"
              required
              value={hostCountry}
              onChange={(e) => setHostCountry(e.target.value)}
              placeholder="Host Country"
              className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Details / Description */}
          <div className="flex items-start space-x-3 bg-gray-50 rounded-lg shadow-inner px-3 py-2">
            <FiInfo className="text-yellow-500 text-xl mt-2" />
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Details / Description"
              className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-400 resize-none h-24"
            />
          </div>

          {/* Deadline */}
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg shadow-inner px-3 py-2">
            <FiCalendar className="text-red-500 text-xl" />
            <input
              type="date"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-800"
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
