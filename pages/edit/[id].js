// 📁 pages/edit/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Layout from '../../components/layout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

export default function EditScholarship() {
  const router = useRouter();
  const { id } = router.query;

  const [user, loading] = useAuthState(auth);
  const [scholarship, setScholarship] = useState({
    title: '',
    description: '',
    country: '',
    deadline: '',
    link: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  // Only you can edit – check user email
  const ADMIN_EMAIL = 'safi65225@gmail.com'; // Replace with your own email

  useEffect(() => {
    const fetchScholarship = async () => {
      if (!id) return;

      const docRef = doc(db, 'scholarships', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setScholarship(docSnap.data());
      } else {
        console.error('Scholarship not found!');
      }
      setIsLoading(false);
    };

    fetchScholarship();
  }, [id]);

  const handleChange = (e) => {
    setScholarship({ ...scholarship, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'scholarships', id);
      await updateDoc(docRef, scholarship);
      alert('Scholarship updated!');
      router.push('/scholarships');
    } catch (error) {
      console.error('Error updating document:', error);
      alert('Failed to update.');
    }
  };

  if (loading || isLoading) return <p className="text-center mt-10">Loading...</p>;

  // Restrict access
  if (!user || user.email !== ADMIN_EMAIL) {
    return <p className="text-center mt-10 text-red-600">Access Denied</p>;
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10 px-4 text-white">
        <h1 className="text-3xl font-bold mb-6">Edit Scholarship</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={scholarship.title}
            onChange={handleChange}
            placeholder="Scholarship Title"
            className="w-full px-4 py-2 text-black rounded"
            required
          />
          <textarea
            name="description"
            value={scholarship.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            className="w-full px-4 py-2 text-black rounded"
            required
          />
          <input
            name="country"
            value={scholarship.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full px-4 py-2 text-black rounded"
            required
          />
          <input
            name="deadline"
            value={scholarship.deadline}
            onChange={handleChange}
            placeholder="Deadline"
            type="date"
            className="w-full px-4 py-2 text-black rounded"
          />
          <input
            name="link"
            value={scholarship.link}
            onChange={handleChange}
            placeholder="Application Link"
            className="w-full px-4 py-2 text-black rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Update Scholarship
          </button>
        </form>
      </div>
    </Layout>
  );
}
