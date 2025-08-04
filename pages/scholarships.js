// pages/scholarships.js
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { db } from '../firebaseConfig';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const router = useRouter();

  // Fetch all scholarships
  const fetchScholarships = async () => {
    const querySnapshot = await getDocs(collection(db, 'scholarships'));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setScholarships(data);
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  // Delete scholarship
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this scholarship?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'scholarships', id));
      fetchScholarships(); // Refresh the list
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  // Navigate to Edit page
  const handleEdit = (id) => {
    router.push(`/editScholarship?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-4 py-8">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">All Scholarships</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scholarships.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-700">{item.description}</p>
              <p className="text-blue-600 mt-2">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.link}
                </a>
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
