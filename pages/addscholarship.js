import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../authContext"; // Assuming you have auth context

export default function AddScholarship() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !link) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "scholarships"), {
        title,
        description,
        link,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setDescription("");
      setLink("");
      alert("Scholarship added successfully!");
    } catch (error) {
      console.error("Error adding scholarship: ", error);
    }
  };

  // Only show form to you
  if (!user || user.email !== "muhammadabbassafi332@gmail.com") {
    return null;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Add Scholarship
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Scholarship Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Scholarship Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="url"
          placeholder="Scholarship Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition"
        >
          Add Scholarship
        </button>
      </form>
    </div>
  );
}
