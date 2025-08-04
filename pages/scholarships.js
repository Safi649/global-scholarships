import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const router = useRouter();

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

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this scholarship?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "scholarships", id));
      setScholarships((prev) => prev.filter((s) => s.id !== id));
      alert("Scholarship deleted successfully!");
    } catch (error) {
      alert("Error deleting scholarship: " + error.message);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center">Scholarship Listings</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((scholarship) => (
          <div key={scholarship.id} className="bg-white shadow-md rounded p-4 border border-gray-200">
            <h2 className="text-xl font-semibold">{scholarship.title}</h2>
            <p className="text-sm mt-2 mb-4">{scholarship.description}</p>

            <div className="flex space-x-2">
              <button
                onClick={() => router.push(`/editScholarship?id=${scholarship.id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(scholarship.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/addscholarships"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded"
        >
          + Add Scholarship
        </Link>
      </div>
    </div>
  );
}
