import { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function AddScholarships() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [website, setWebsite] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const ADMIN_EMAIL = "muhammadabbassafi332@gmail.com"; // Only this email can add

  // Track auth state
  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to add a scholarship.");
      return;
    }

    if (user.email !== ADMIN_EMAIL) {
      alert("You are not authorized to add scholarships.");
      return;
    }

    if (!title || !description || !deadline || !website) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      let fileURL = "";

      // Upload file if selected
      if (file) {
        const fileRef = ref(storage, `scholarship_files/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        fileURL = await getDownloadURL(fileRef);
      }

      await addDoc(collection(db, "scholarships"), {
        title,
        description,
        deadline,
        website,
        fileURL,
        createdAt: serverTimestamp(),
        createdBy: user.email,
      });

      alert("Scholarship added successfully!");
      setTitle("");
      setDescription("");
      setDeadline("");
      setWebsite("");
      setFile(null);
    } catch (error) {
      console.error("Error adding scholarship:", error);
      alert("Error adding scholarship. Check console for details.");
    }

    setLoading(false);
  };

  if (!user) {
    return <p className="text-center mt-10">Please log in to add a scholarship.</p>;
  }

  if (user.email !== ADMIN_EMAIL) {
    return <p className="text-center mt-10 text-red-500">Access denied — admin only.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6">Add Scholarship</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Scholarship Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Scholarship Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        ></textarea>

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="url"
          placeholder="Scholarship Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Scholarship"}
        </button>
      </form>
    </div>
  );
}
