// pages/addscholarship.js
import { useState, useEffect } from "react";
import Head from "next/head";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function AddScholarship() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", deadline: "", location: "", link: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && u.email === "muhammadabbassafi332@gmail.com") {
        setUser(u);
      } else {
        router.push("/");
      }
    });
    return () => unsub();
  }, [router]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(""); setError("");
    try {
      await addDoc(collection(db, "scholarships"), { ...formData, createdAt: serverTimestamp() });
      setSuccess("✅ Scholarship added successfully!");
      setFormData({ title: "", description: "", deadline: "", location: "", link: "" });
    } catch (err) {
      console.error(err);
      setError("❌ Failed to add scholarship.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Add Scholarship | Global Scholarships</title>
      </Head>

      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Add New Scholarship</h1>

          {success && <p className="mb-4 text-green-600 font-medium bg-green-100 px-4 py-2 rounded-lg">{success}</p>}
          {error && <p className="mb-4 text-red-600 font-medium bg-red-100 px-4 py-2 rounded-lg">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Scholarship Title</label>
              <input name="title" value={formData.title} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Location</label>
              <input name="location" value={formData.location} onChange={handleChange} placeholder="e.g., USA, UK, Worldwide" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Application Link</label>
              <input type="url" name="link" value={formData.link} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">{loading ? "Adding..." : "Add Scholarship"}</button>
          </form>
        </div>
      </div>
    </>
  );
}
