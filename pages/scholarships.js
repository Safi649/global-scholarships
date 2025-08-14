// 📄 pages/scholarships.js
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch scholarships from Firestore
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "scholarships"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setScholarships(data);
      } catch (error) {
        console.error("❌ Error fetching scholarships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-blue-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🌍 Global Scholarships
      </motion.h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading scholarships...</p>
      ) : scholarships.length === 0 ? (
        <p className="text-center text-gray-500">No scholarships found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship, index) => (
            <motion.div
              key={scholarship.id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {scholarship.title}
              </h2>
              <p className="text-gray-600 mt-2">{scholarship.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                📅 Deadline: {scholarship.deadline}
              </p>
              {scholarship.link && (
                <Link
                  href={scholarship.link}
                  target="_blank"
                  className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Apply Now
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
