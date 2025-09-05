// pages/addscholarship.js
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FiGlobe, FiMapPin, FiCalendar, FiSave, FiX, FiBook } from "react-icons/fi";

export default function AddScholarship() {
  const [user, loadingUser] = useAuthState(auth);
  const router = useRouter();

  const adminEmail = "muhammadabbassafi332@gmail.com";
  const isAdmin = !!user && user.email === adminEmail;

  const [form, setForm] = useState({
    name: "",
    country: "",
    hostCountry: "",
    details: "",
    deadline: "",
    link: "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (!loadingUser && !isAdmin) {
      // not redirecting — just show access denied. (Optional: redirect)
    }
  }, [loadingUser, isAdmin]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () =>
    setForm({ name: "", country: "", hostCountry: "", details: "", deadline: "", link: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    // simple validation
    if (!form.name.trim()) return setMsg({ type: "error", text: "Please enter scholarship name." });
    if (!form.deadline) return setMsg({ type: "error", text: "Please select a deadline." });

    setSaving(true);
    try {
      await addDoc(collection(db, "scholarships"), {
        name: form.name.trim(),
        country: form.country.trim() || null,
        hostCountry: form.hostCountry.trim() || null,
        details: form.details.trim() || null,
        deadline: form.deadline || null,
        link: form.link?.trim() || null,
        createdAt: serverTimestamp(),
      });

      setMsg({ type: "success", text: "Scholarship added successfully." });
      resetForm();

      // optional: route to list
      setTimeout(() => router.push("/scholarships"), 900);
    } catch (err) {
      console.error("Add scholarship error:", err);
      setMsg({ type: "error", text: "Failed to add scholarship. Make sure you are signed in as admin." });
    } finally {
      setSaving(false);
    }
  };

  // Access denied UI for non-admins
  if (!loadingUser && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl text-center bg-black/60 p-8 rounded-2xl border border-gray-700 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-3">Access Denied</h2>
          <p className="text-gray-300 mb-4">
            Only the site administrator can add scholarships. Please log in with the admin account to continue.
          </p>
          <p className="text-sm text-gray-400">Admin email: <strong>{adminEmail}</strong></p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-tr from-white/6 to-white/3 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Add Scholarship</h1>
              <p className="text-sm text-gray-300 mt-1">Create a new scholarship — futuristic style ✨</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { resetForm(); setMsg(null); }}
                title="Reset"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <FiX />
              </button>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs text-gray-300">Name of Scholarship</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Fully Funded Canada Scholarship"
                  className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              </label>

              <label className="block">
                <span className="text-xs text-gray-300">Country</span>
                <div className="relative mt-1">
                  <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Origin country (optional)"
                    className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                  <FiMapPin className="absolute right-3 top-3 text-gray-300" />
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs text-gray-300">Host Country</span>
                <input
                  name="hostCountry"
                  value={form.hostCountry}
                  onChange={handleChange}
                  placeholder="e.g., Canada"
                  className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              </label>

              <label className="block">
                <span className="text-xs text-gray-300">Deadline</span>
                <div className="mt-1 relative">
                  <input
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    type="date"
                    className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                  <FiCalendar className="absolute right-3 top-3 text-gray-300" />
                </div>
              </label>
            </div>

            <label className="block">
              <span className="text-xs text-gray-300">Details / Description</span>
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                rows={5}
                placeholder="Full scholarship details, eligibility, how to apply..."
                className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </label>

            <label className="block">
              <span className="text-xs text-gray-300">External Link (optional)</span>
              <input
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="Link to official page"
                className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </label>

            {msg && (
              <div className={`rounded-md p-3 text-sm ${msg.type === "success" ? "bg-green-800/60 text-green-200" : "bg-red-800/60 text-red-200"}`}>
                {msg.text}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl shadow-lg transition"
              >
                <FiSave /> {saving ? "Saving..." : "Save Scholarship"}
              </button>

              <button
                type="button"
                onClick={() => { resetForm(); setMsg(null); }}
                className="px-4 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition"
              >
                Reset
              </button>
            </div>
          </form>

          <footer className="mt-6 text-xs text-gray-400">
            Only admin <strong>{adminEmail}</strong> can add scholarships.
          </footer>
        </motion.div>
      </div>
    </div>
  );
}
