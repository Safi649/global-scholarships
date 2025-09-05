// 📁 pages/scholarships.js
import { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Layout from "../components/layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // ✅ make sure firebase.js is set up

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
        console.error("Error fetching scholarships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <Layout>
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

        {/* ✅ Open Graph for Social Sharing */}
        <meta property="og:title" content="Scholarships | Global Scholarships" />
        <meta
          property="og:description"
          content="Find international scholarships from around the world. Verified opportunities for students of all fields."
        />
        <meta
          property="og:url"
          content="https://global-scholarships.netlify.app/scholarships"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Scholarships | Global Scholarships" />
        <meta
          name="twitter:description"
          content="Browse the latest scholarship opportunities. Verified and updated daily."
        />
        <meta name="twitter:image" content="/logo.png" />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center text-blue-700"
          >
            Available Scholarships
          </motion.h1>

          {/* Loader */}
          {loading ? (
            <p className="text-center text-gray-600">Loading scholarships...</p>
          ) : scholarships.length === 0 ? (
            <p className="text-center text-gray-600">
              No scholarships found. Please check back later.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {scholarships.map((sch) => (
                <motion.div
                  key={sch.id}
                  whileHover={{ scale: 1.03 }}
                  className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Decorative gradient header */}
                  <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                  <div className="p-6 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition">
                        {sch.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {sch.description}
                      </p>
                      <p className="text-gray-500 text-sm mb-2">
                        <strong>Deadline:</strong> {sch.deadline || "N/A"}
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        <strong>Location:</strong> {sch.location || "Worldwide"}
                      </p>
                    </div>

                    <a
                      href={sch.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-block text-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-indigo-700 transition"
                    >
                      Apply Now
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
