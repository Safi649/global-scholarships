// addscholarship.js

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";

export default function AddScholarship() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !link) {
      alert("Please fill all fields");
      return;
    }
    await addDoc(collection(db, "scholarships"), {
      title,
      description,
      link
    });
    router.push("/scholarships");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Scholarship
        </h2>

        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          placeholder="Enter scholarship title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          placeholder="Enter scholarship description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          rows="4"
        />

        <label className="block mb-2 font-medium">Scholarship Link</label>
        <input
          type="url"
          placeholder="https://example.com"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Scholarship
        </button>
      </form>
    </div>
  );
}
