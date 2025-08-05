// 📁 pages/editScholarship.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../firebase"; // Update path if different

export default function EditScholarship() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    eligibleCountry: "",
    applyLink: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const docRef = doc(db, "scholarships", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
          setPreview(docSnap.data().imageUrl);
        } else {
          alert("Scholarship not found!");
          router.push("/scholarships");
        }
      };
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedData = { ...formData };

      // If a new image was selected
      if (imageFile) {
        const storageRef = ref(storage, `scholarshipImages/${id}`);
        await uploadBytes(storageRef, imageFile);
        const downloadURL = await getDownloadURL(storageRef);
        updatedData.imageUrl = downloadURL;
      }

      await updateDoc(doc(db, "scholarships", id), updatedData);
      alert("Scholarship updated successfully!");
      router.push("/scholarships");
    } catch (error) {
      console.error("Error updating scholarship:", error);
      alert("Failed to update scholarship.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Scholarship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Scholarship Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Country</label>
          <input
            type="text"
            name="country"
            className="w-full border rounded px-3 py-2"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Eligible Country</label>
          <input
            type="text"
            name="eligibleCountry"
            className="w-full border rounded px-3 py-2"
            value={formData.eligibleCountry}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Apply Link</label>
          <input
            type="url"
            name="applyLink"
            className="w-full border rounded px-3 py-2"
            value={formData.applyLink}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Image</label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover mb-2 rounded border"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Scholarship"}
        </button>
      </form>
    </div>
  );
}
