// pages/addscholarships.js
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, storage } from "../firebaseConfig"; // make sure path is correct
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function AddScholarship() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    eligibility: "",
    applyLink: "",
  });

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const docRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists() && userDoc.data().admin === true) {
          setIsAdmin(true);
        } else {
          alert("You are not an admin.");
          router.push("/");
        }
      } else {
        router.push("/login");
      }
    });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setImageFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) return alert("Please upload an image");

    try {
      const imageRef = ref(storage, `scholarship_images/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "scholarships"), {
        ...formData,
        imageUrl,
        createdAt: new Date(),
      });

      alert("Scholarship added successfully!");
      setFormData({ name: "", country: "", eligibility: "", applyLink: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding scholarship:", error);
      alert("Failed to add scholarship.");
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Scholarship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Scholarship Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Eligible Country"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="eligibility"
          placeholder="Eligibility"
          value={formData.eligibility}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          name="applyLink"
          placeholder="Apply Link"
          value={formData.applyLink}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Image Upload */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed p-4 text-center rounded cursor-pointer"
        >
          {imageFile ? (
            <p>{imageFile.name}</p>
          ) : (
            <p>Drag and drop image here or click below to upload</p>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
          required={!imageFile}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Add Scholarship
        </button>
      </form>
    </div>
  );
}
