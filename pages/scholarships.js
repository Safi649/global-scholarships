// pages/scholarships.js
import { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({}); // ✅ track expanded cards

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
        console.error("Error fetching scholarships:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Head>
        <title>Scholarships | Global Scholarships</title>
        <meta
          name="description"
          content="Explore the latest international scholarships and study opportunities. Verified and updated regularly."
        />
        <link
          rel="canonical"
          href="https://global-scholarships.netlify.app/scholarships"
        />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center text-blue-700"
          >
            Available Scholarships
          </motion.h1>

          {loading ? (
            <p className="text-center text-gray-600">
              Loading scholarships...
            </p>
          ) : scholarships.length === 0 ? (
            <p className="text-center text-gray-600">
              No scholarships found. Please check back later.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {scholarships.map((sch) => {
                const isExpanded = expanded[sch.id];
                const description = sch.description || sch.details || "";

                return (
                  <motion.div
                    key={sch.id}
                    whileHover={{ scale: 1.03 }}
                    className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition">
                          {sch.title || sch.name}
                        </h3>

                        {/* Description with Read More / Less */}
                        <p
                          className={`text-gray-600 text-sm mb-2 ${
                            isExpanded ? "" : "line-clamp-3"
                          }`}
                        >
                          {description}
                        </p>
                        {description.length > 120 && (
                          <button
                            onClick={() => toggleExpand(sch.id)}
                            className="text-indigo-600 text-sm font-semibold hover:underline mb-4"
                          >
                            {isExpanded ? "Read Less ▲" : "Read More ▼"}
                          </button>
                        )}

                        <p className="text-gray-500 text-sm mb-2">
                          <strong>Deadline:</strong> {sch.deadline || "N/A"}
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                          <strong>Location:</strong>{" "}
                          {sch.location || sch.hostCountry || "Worldwide"}
                        </p>
                      </div>
                      <a
                        href={sch.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-block text-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-indigo-700 transition"
                      >
                        {sch.link ? "Apply Now" : "Details"}
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
