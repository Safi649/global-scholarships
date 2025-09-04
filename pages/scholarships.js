import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { FiBook, FiMapPin, FiAward } from "react-icons/fi";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", country: "", university: "", description: "", link: "" });
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState({});
  const isAdmin = user?.email === "muhammadabbassafi332@gmail.com";

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => setUser(currentUser));
    const q = query(collection(db, "scholarships"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setScholarships(data);
    });

    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, []);

  const handleEditClick = (sch) => {
    setEditingId(sch.id);
    setEditData({ title: sch.title, country: sch.country, university: sch.university, description: sch.description, link: sch.link });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      await updateDoc(doc(db, "scholarships", editingId), editData);
      setEditingId(null);
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "scholarships", id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((sch) => {
          const isExpanded = expanded[sch.id];
          return (
            <div
              key={sch.id}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col"
            >
              {/* Gradient header */}
              <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

              <div className="p-6 flex flex-col flex-grow space-y-3">
                {editingId === sch.id ? (
                  <div className="space-y-3 flex-grow">
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={editData.country}
                      onChange={(e) => setEditData({ ...editData, country: e.target.value })}
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Country"
                    />
                    <input
                      type="text"
                      value={editData.university}
                      onChange={(e) => setEditData({ ...editData, university: e.target.value })}
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="University"
                    />
                    <textarea
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
                      placeholder="Description"
                    />
                    <input
                      type="url"
                      value={editData.link}
                      onChange={(e) => setEditData({ ...editData, link: e.target.value })}
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Scholarship Link"
                    />
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
                      {sch.title}
                    </h2>

                    {/* Country & University */}
                    <div className="flex items-center space-x-4 mt-2 text-gray-600">
                      {sch.country && (
                        <div className="flex items-center space-x-1">
                          <FiMapPin className="text-green-500" />
                          <span>{sch.country}</span>
                        </div>
                      )}
                      {sch.university && (
                        <div className="flex items-center space-x-1">
                          <FiAward className="text-yellow-500" />
                          <span>{sch.university}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className={`text-gray-600 mt-3 leading-relaxed transition-all ${!isExpanded ? "line-clamp-3" : ""}`}>
                      {sch.description}
                    </p>
                    {sch.description && (
                      <button
                        onClick={() => toggleExpand(sch.id)}
                        className="text-indigo-600 mt-2 font-semibold hover:underline self-start"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}

                    {/* Link */}
                    {sch.link && (
                      <a
                        href={sch.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center text-indigo-600 font-semibold hover:underline"
                      >
                        🌐 Visit Scholarship
                      </a>
                    )}

                    {/* Admin actions */}
                    {isAdmin && (
                      <div className="flex gap-3 mt-5">
                        <button
                          onClick={() => handleEditClick(sch)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 shadow-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(sch.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
