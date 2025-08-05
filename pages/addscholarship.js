// pages/addscholarships.js
import { useState, useEffect } from "react";
import { db, storage } from "@/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebaseConfig";

const ADMIN_EMAILS = ["muhammadabbassafi332@gmail.com"]; // Replace with your real admin email(s)

export default function AddScholarship() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [eligible, setEligible] = useState("");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  // Admin access protection
  useEffect(() => {
    if (!loading && (!user || !ADMIN_EMAILS.includes(user.email))) {
      router.push("/"); // Redirect non-admins
    }
  }, [user, loading]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImageFile(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !country || !eligible || !link || !imageFile) {
      setError("All fields are required.");
      return;
    }

    try {
      setUploading(true);
      const imageRef = ref(storage, `scholarships/${Date.now()}-${imageFile.name}`);
      const uploadTask = uploadBytesResumable(imageRef, imageFile);

      uploadTask.on(
        "state_changed",
        null,
        (err) => {
          setUploading(false);
          setError("Upload failed: " + err.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await addDoc(collection(db, "scholarships"), {
            name,
            country,
            eligible,
            link,
            image: downloadURL,
            createdAt: Timestamp.now(),
            createdBy: user?.email || "unknown",
          });

          setSuccess("🎉 Scholarship added successfully!");
          setName("");
          setCountry("");
          setEligible("");
          setLink("");
          setImageFile(null);
          setImageURL("");
        }
      );
    } catch (err) {
      setError("Failed to add scholarship: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Add Scholarship</h1>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Scholarship Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Scholarship Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Eligible Countries"
          value={eligible}
          onChange={(e) => setEligible(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="url"
          placeholder="Apply Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed p-4 rounded cursor-pointer text-center"
        >
          <p className="text-gray-500">Drag and drop image here or click to upload</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="upload-image"
          />
          <label
            htmlFor="upload-image"
            className="block mt-2 cursor-pointer text-blue-600 underline"
          >
            Choose file
          </label>
        </div>

        {imageURL && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Preview:</p>
            <img
              src={imageURL}
              alt="Preview"
              className="w-40 h-40 object-cover rounded border"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Add Scholarship"}
        </button>
      </form>
    </div>
  );
}
