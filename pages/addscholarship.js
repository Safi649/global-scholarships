// pages/addScholarships.js
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useRouter } from 'next/router';

export default function AddScholarship() {
  const [formData, setFormData] = useState({
    imageUrl: '',
    title: '',
    country: '',
    eligibleCountries: '',
    link: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'scholarships'), formData);
      alert('Scholarship added successfully!');
      router.push('/scholarships');
    } catch (error) {
      console.error('Error adding scholarship:', error);
      alert('Failed to add scholarship.');
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 text-gray-900">
      <Navbar />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Add New Scholarship</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
          {/* Image URL */}
          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter image URL"
              required
            />
          </div>

          {/* Scholarship Name */}
          <div>
            <label className="block mb-1 font-medium">Scholarship Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. DAAD Germany Scholarship"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block mb-1 font-medium">Country Offering Scholarship</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. Germany"
              required
            />
          </div>

          {/* Eligible Countries */}
          <div>
            <label className="block mb-1 font-medium">Eligible Countries</label>
            <input
              type="text"
              name="eligibleCountries"
              value={formData.eligibleCountries}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. All Developing Countries"
              required
            />
          </div>

          {/* Direct Apply Link */}
          <div>
            <label className="block mb-1 font-medium">Apply Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="https://apply.scholarship.org"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Add Scholarship
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
