import { useState } from 'react';
import { db } from '../../firebase';
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

    if (!title || !country || !university) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'scholarships'), {
        title,
        country,
        university,
        createdAt: serverTimestamp(),
      });
      router.push('/scholarships'); // redirect after adding
    } catch (error) {
      console.error('Error adding scholarship:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-100 text-gray-800">
      <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Scholarship</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Scholarship Title"
            className="w-full p-3 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Country"
            className="w-full p-3 border rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <input
            type="text"
            placeholder="University"
            className="w-full p-3 border rounded"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Adding...' : 'Add Scholarship'}
          </button>
        </form>
      </div>
    </div>
  );
}
