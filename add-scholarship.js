import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function AddScholarship() {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [university, setUniversity] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'scholarships'), {
        title,
        country,
        university,
        createdAt: serverTimestamp(),
      });
      router.push('/scholarships');
    } catch (error) {
      console.error('Error adding scholarship:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50 text-gray-800">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Scholarship</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="E.g., Fully Funded Canada Scholarship"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="E.g., Canada"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">University</label>
            <input
              type="text"
              required
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="E.g., University of Toronto"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
          >
            {loading ? 'Adding...' : 'Add Scholarship'}
          </button>
        </form>
      </div>
    </div>
  );
}
