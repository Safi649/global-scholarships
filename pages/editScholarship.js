import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // ✅ using only Firestore

export default function EditScholarship() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    location: "",
    eligibleCountries: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const docRef = doc(db, "scholarships", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateDoc(doc(db, "scholarships", id), formData);
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
          <label className="block font-medium">Scholarship Title</label>
          <input
            type="text"
            name="title"
            className="w-full border rounded px-3 py-2"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            className="w-full border rounded px-3 py-2"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Deadline</label>
          <input
            type="date"
            name="deadline"
            className="w-full border rounded px-3 py-2"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            className="w-full border rounded px-3 py-2"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">Eligible Countries</label>
          <input
            type="text"
            name="eligibleCountries"
            className="w-full border rounded px-3 py-2"
            value={formData.eligibleCountries}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">Application Link</label>
          <input
            type="url"
            name="link"
            className="w-full border rounded px-3 py-2"
            value={formData.link}
            onChange={handleChange}
            required
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
