// pages/addscholarships.js

import { useEffect, useState } from "react";
import { db, storage, auth } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function AddScholarship() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  // ✅ Admin-only access
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser?.email === "muhammadabbassafi332@gmail.com") {
        setUser(firebaseUser);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!title || !description || !deadline || !imageFile) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    setUploading(true);

    const storageRef = ref(storage, `scholarships/${Date.now()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        alert("Image upload failed.");
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Add to Firestore
        await addDoc(collection(db, "scholarships"), {
          title,
          description,
          deadline,
          imageUrl: downloadURL,
          createdAt: serverTimestamp(),
          createdBy: user.email,
        });

        alert("Scholarship added!");
        setTitle("");
        setDescription("");
        setDeadline("");
        setImageFile(null);
        setImageUrl("");
        setUploadProgress(0);
        setUploading(false);
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add Scholarship
      </h2>

      <input
        type="text"
        placeholder="Scholarship Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border rounded mb-4"
        rows={5}
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      <div
        className="w-full p-6 border-dashed border-2 rounded-lg text-center mb-4 bg-gray-50"
        onDrop={handleDragDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-gray-500">Drag & Drop image here</p>
        <p className="text-gray-400 text-sm">or</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-2"
        />
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-auto rounded mb-4"
        />
      )}

      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
      >
        {uploading ? "Uploading..." : "Add Scholarship"}
      </button>
    </div>
  );
}
