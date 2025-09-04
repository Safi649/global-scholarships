// 📁 pages/scholarships.js
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "", link: "" });

  // ✅ Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      // ✅ Check admin email
      if (u?.email === "muhammadabbassafi332@gmail.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Fetch scholarships
  useEffect(() => {
    const fetchScholarships = async () => {
      const querySnapshot = await getDocs(collection(db, "scholarships"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setScholarships(data);
    };
    fetchScholarships();
  }, []);

  // ✅ Delete scholarship (admin only)
  const handleDelete = async (id) => {
    if (!isAdmin) return;
    await deleteDoc(doc(db, "scholarships", id));
    setScholarships(scholarships.filter((s) => s.id !== id));
  };

  // ✅ Start editing
  const handleEditClick = (scholarship) => {
    if (!isAdmin) return;
    setEditingId(scholarship.id);
    setEditData({
      title: scholarship.title,
      description: scholarship.description,
      link: scholarship.link,
    });
  };

  // ✅ Save edit
  const handleSaveEdit = async () => {
    if (!isAdmin) return;
    const docRef = doc(db, "scholarships", editingId);
    await updateDoc(docRef, editData);
    setScholarships(
      scholarships.map((s) =>
        s.id === editingId ? { ...s, ...editData } : s
      )
    );
    setEditingId(null);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-600">
        🎓 Scholarships
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((sch) => (
          <div
            key={sch.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
          >
            {editingId === sch.id ? (
              // ✏️ Editing mode
              <div className="space-y-3">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Title"
                />
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Description"
                />
                <input
                  type="url"
                  value={editData.link}
                  onChange={(e) => setEditData({ ...editData, link: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Scholarship Link"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
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
              // 📄 Normal card view
              <>
                <h2 className="text-xl font-bold text-gray-800">{sch.title}</h2>
                <p className="text-gray-600 mt-2">{sch.description}</p>
                {sch.link && (
                  <a
                    href={sch.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 font-medium mt-3 inline-block hover:underline"
                  >
                    🌐 Visit Scholarship
                  </a>
                )}

                {/* 🔐 Show buttons only for admin */}
                {isAdmin && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleEditClick(sch)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sch.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
