// 📁 pages/scholarships.js
import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ Check logged-in user & admin role
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // 🔍 Check if user is admin from Firestore
        const adminEmails = ["admin@example.com", "youremail@gmail.com"]; // ✅ Change this
        setIsAdmin(adminEmails.includes(currentUser.email));
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubAuth();
  }, []);

  // ✅ Get scholarships in real time
  useEffect(() => {
    const q = query(collection(db, "scholarships"));
    const unsub = onSnapshot(q, (snapshot) => {
      setScholarships(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
    return () => unsub();
  }, []);

  // ✅ Delete scholarship (Admin only)
  const handleDelete = async (id) => {
    if (!isAdmin) return alert("Not authorized!");
    if (confirm("Delete this scholarship?")) {
      await deleteDoc(doc(db, "scholarships", id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🌍 Latest Scholarships
      </h1>

      {/* Admin Add Button */}
      {isAdmin && (
        <div className="mb-6 text-center">
          <Link
            href="/addscholarships"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ➕ Add Scholarship
          </Link>
        </div>
      )}

      {/* Scholarships List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.length === 0 ? (
          <p className="text-center col-span-full">No scholarships found.</p>
        ) : (
          scholarships.map((sch) => (
            <div
              key={sch.id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
            >
              <h2 className="text-xl font-semibold mb-2">{sch.title}</h2>
              <p className="text-gray-600 flex-grow">{sch.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Deadline: {sch.deadline}
              </p>
              {sch.link && (
                <a
                  href={sch.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-blue-500 hover:underline"
                >
                  🔗 Apply Now
                </a>
              )}

              {/* Delete button (Admin only) */}
              {isAdmin && (
                <button
                  onClick={() => handleDelete(sch.id)}
                  className="mt-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  🗑 Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
