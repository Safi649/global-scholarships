// 📁 pages/addscholarship.js

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Layout from "../components/layout";

export default function AddScholarship() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    country: "",
    level: "",
    deadline: "",
    link: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Only allow admin access
  useEffect(() => {
    if (!loading) {
      if (!user || user.email !== "muhammadabbassafi332@gmail.com") {
        router.push("/"); // 🚫 Not admin → redirect
      }
    }
  }, [user, loading]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "scholarships"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setMessage("✅ Scholarship added successfully!");
      setFormData({ title: "", country: "", level: "", deadline: "", link: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Error saving scholarship.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-6 text-center">Add Scholarship</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Scholarship Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              name="level"
              placeholder="Study Level (e.g. Undergraduate)"
              value={formData.level}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="url"
              name="link"
              placeholder="Application Link"
              value={formData.link}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save Scholarship
            </button>
          </form>

          {message && <p className="mt-4 text-center text-sm">{message}</p>}
        </div>
      </div>
    </Layout>
  );
}
