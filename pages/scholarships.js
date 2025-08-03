import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const q = query(collection(db, 'scholarships'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setScholarships(data);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">All Scholarships</h1>

        {loading ? (
          <p className="text-center">Loading scholarships...</p>
        ) : scholarships.length === 0 ? (
          <p className="text-center text-gray-500">No scholarships found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scholarships.map((scholarship) => (
              <div key={scholarship.id} className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold">{scholarship.title}</h2>
                <p className="text-gray-600 mt-2">
                  <strong>Country:</strong> {scholarship.country}
                </p>
                <p className="text-gray-600">
                  <strong>University:</strong> {scholarship.university}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Added: {scholarship.createdAt?.toDate().toLocaleString()}
                </p>

                {/* ✏️ Edit Link */}
                <a
                  href={`/scholarships/edit/${scholarship.id}`}
                  className="inline-block mt-4 text-blue-600 hover:underline text-sm"
                >
                  ✏️ Edit
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
