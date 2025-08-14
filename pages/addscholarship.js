import { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";

export default function AddScholarships() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const router = useRouter();

  // Your admin email
  const adminEmail = "muhammadabbassafi332@gmail.com";

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      // Redirect if not admin
      if (!user || user.email !== adminEmail) {
        router.push("/"); // redirect to homepage
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let fileURL = "";
      if (file) {
        const fileRef = ref(storage, `scholarships/${file.name}`);
        await uploadBytes(fileRef, file);
        fileURL = await getDownloadURL(fileRef);
      }

      await addDoc(collection(db, "scholarships"), {
        title,
        description,
        fileURL,
        createdAt: serverTimestamp(),
      });

      alert("Scholarship added successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error("Error adding scholarship:", error);
      alert("Error adding scholarship. Check console for details.");
    }
  };

  if (loading) return <p>Loading...</p>;

  // Only render form if admin
  if (!user || user.email !== adminEmail) {
    return <p>You are not authorized to add scholarships.</p>;
  }

  return (
    <div>
      <h1>Add Scholarship</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Scholarship Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Scholarship Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Add Scholarship</button>
      </form>
    </div>
  );
}
