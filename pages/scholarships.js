import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      const querySnapshot = await getDocs(collection(db, "scholarships"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setScholarships(data);
    };
    fetchScholarships();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🌍 Latest Scholarships
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => (
          <motion.div
            key={scholarship.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-200"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                {scholarship.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {scholarship.description}
              </p>
            </div>
            {scholarship.link && (
              <a
                href={scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-center"
              >
                Apply Now
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
