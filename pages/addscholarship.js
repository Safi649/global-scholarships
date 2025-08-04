import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Layout from '../components/layout';

export default function AddScholarship() {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [deadline, setDeadline] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'scholarships'), {
        title,
        country,
        deadline,
        link,
        createdAt: serverTimestamp(),
      });

      alert('Scholarship added!');
      setTitle('');
      setCountry('');
      setDeadline('');
      setLink('');
    } catch (err) {
      console.error('Error adding scholarship:', err);
      alert('Error saving scholarship.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Add Scholarship</h2>

          <input
            type="text"
            placeholder="Scholarship Title"
            className="w-full mb-4 p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Country"
            className="w-full mb-4 p-2 border rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Deadline"
            className="w-full mb-4 p-2 border rounded"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Application Link"
            className="w-full mb-4 p-2 border rounded"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Scholarship
          </button>
        </form>
      </div>
    </Layout>
  );
}
