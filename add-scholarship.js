// 📁 pages/add-scholarship.js

import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function AddScholarship() {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [university, setUniversity] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await addDoc(collection(db, 'scholarships'), {
        title,
        country,
        university,
        createdAt: Timestamp.now(),
      });

      setMessage('✅ Scholarship added successfully!');
      setTitle('');
      setCountry('');
      setUniversity('');
    } catch (error) {
      console.error('❌ Error adding scholarship:', error);
      setMessage('❌ Failed to add scholarship. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50 text-gray-800">
      <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Scholarship</h1>
        
        {message && (
          <p className={`mb-4 text-sm font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Scholarship Title"
            className="w-full border px-4 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Country"
            className="w-full border px-4 py-2 rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="University Name"
            className="w-full border px-4 py-2 rounded"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Scholarship'}
          </button>
        </form>
      </div>
    </div>
  );
}
