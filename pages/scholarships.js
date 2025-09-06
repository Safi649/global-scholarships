import { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // ✅ new search state
  const [user] = useAuthState(auth);
  const router = useRouter();

  const ADMIN_EMAIL = "muhammadabbassafi332@gmail.com"; // ✅ your admin email

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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this scholarship?")) return;
    try {
      await deleteDoc(doc(db, "scholarships", id));
      setScholarships((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // ✅ Filter scholarships by searchTerm (checks all fields for partial match)
  const filteredScholarships = scholarships.filter((sch) =>
    Object.values(sch).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

          {/* ✅ Search bar */}
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-lg p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {loading ? (
            <p className="text-center text-gray-600">
              Loading scholarships...
            </p>
          ) : filteredScholarships.length === 0 ? (
            <p className="text-center text-gray-600">
              No scholarships found matching your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredScholarships.map((sch) => {
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

                        {/* ✅ Description with line breaks */}
                        <p
                          className={`text-gray-600 text-sm mb-2 whitespace-pre-line ${
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
                        <p className="text-gray-500 text-sm mb-2">
                          <strong>Location:</strong>{" "}
                          {sch.location || sch.hostCountry || "Worldwide"}
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                          <strong>Eligible Countries:</strong>{" "}
                          {sch.eligibleCountries || "Open to All"}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <a
                          href={sch.link || sch.applyLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-indigo-700 transition"
                        >
                          {sch.link || sch.applyLink ? "Apply Now" : "Details"}
                        </a>

                        {/* ✅ Show edit/delete only for admin */}
                        {user?.email === ADMIN_EMAIL && (
                          <>
                            <button
                              className="px-3 py-2 rounded-lg bg-yellow-500 text-white font-medium shadow hover:bg-yellow-600 transition"
                              onClick={() =>
                                router.push(`/editScholarship?id=${sch.id}`)
                              }
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="px-3 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 transition"
                              onClick={() => handleDelete(sch.id)}
                            >
                              🗑️ Delete
                            </button>
                          </>
                        )}
                      </div>
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
