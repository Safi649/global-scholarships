// 📁 pages/addscholarship.js
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Layout from "../components/layout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";

export default function AddScholarship() {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to add a scholarship.");
      return;
    }

    try {
      await addDoc(collection(db, "scholarships"), {
        title,
        country,
        level,
        deadline,
        description,
        link,
        createdBy: user.email,
        createdAt: new Date()
      });

      alert("Scholarship added successfully!");
      router.push("/scholarships"); // redirect to scholarships page
    } catch (error) {
      console.error("Error saving scholarship:", error.message);
      alert("Error saving scholarship.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white py-10 px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Add Scholarship</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white text-black p-8 rounded-lg shadow-lg space-y-4"
        >
          <input
            type="text"
            placeholder="Scholarship Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Study Level (e.g., Bachelors, Masters)"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="date"
            placeholder="Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="url"
            placeholder="Application Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
          >
            Submit Scholarship
          </button>
        </form>
      </div>
    </Layout>
  );
}
