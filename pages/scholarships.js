// pages/scholarships.js
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { FiMapPin, FiGlobe, FiCalendar, FiEdit, FiTrash2, FiExternalLink } from "react-icons/fi";

export default function Scholarships() {
  const [user, loadingUser] = useAuthState(auth);
  const adminEmail = "muhammadabbassafi332@gmail.com";
  const isAdmin = !!user && user.email === adminEmail;

  const [list, setList] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    country: "",
    hostCountry: "",
    details: "",
    deadline: "",
    link: "",
  });
  const [busyId, setBusyId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "scholarships"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      // sort by createdAt desc if available
      data.sort((a, b) => {
        const ta = a.createdAt?.seconds || 0;
        const tb = b.createdAt?.seconds || 0;
        return tb - ta;
      });
      setList(data);
    }, (err) => console.error("Snapshot error:", err));

    return () => unsub();
  }, []);

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const beginEdit = (sch) => {
    setEditingId(sch.id);
    setEditData({
      name: sch.name || "",
      country: sch.country || "",
      hostCountry: sch.hostCountry || "",
      details: sch.details || "",
      deadline: sch.deadline || "",
      link: sch.link || "",
    });
    setFeedback(null);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setBusyId(editingId);
    try {
      await updateDoc(doc(db, "scholarships", editingId), editData);
      setFeedback({ type: "success", text: "Updated successfully." });
      setEditingId(null);
    } catch (err) {
      console.error("Update error:", err);
      setFeedback({ type: "error", text: "Update failed. Make sure you are admin." });
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    const ok = confirm("Delete this scholarship? This action cannot be undone.");
    if (!ok) return;
    setBusyId(id);
    try {
      await deleteDoc(doc(db, "scholarships", id));
      setFeedback({ type: "success", text: "Deleted successfully." });
    } catch (err) {
      console.error("Delete error:", err);
      setFeedback({ type: "error", text: "Delete failed. Make sure you are admin." });
    } finally {
      setBusyId(null);
    }
  };

  const formatDate = (d) => {
    if (!d) return "No deadline";
    // if already ISO string/date-like
    try {
      const dt = new Date(d);
      if (!isNaN(dt)) return dt.toLocaleDateString();
    } catch {}
    // fallback: return as-is
    return d;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">Scholarships</h1>
            <p className="text-sm text-gray-300">Explore the latest opportunities — stay inspired.</p>
          </div>
          <div className="text-sm text-gray-400">
            {isAdmin ? <span>Signed in as admin</span> : <span>Viewing as guest</span>}
          </div>
        </header>

        {feedback && (
          <div className={`mb-6 p-3 rounded-md text-sm ${feedback.type === "success" ? "bg-green-800/60 text-green-200" : "bg-red-800/60 text-red-200"}`}>
            {feedback.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((sch) => {
            const isExpanded = !!expanded[sch.id];
            const editing = editingId === sch.id;
            return (
              <motion.article
                key={sch.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="relative bg-gradient-to-br from-white/4 to-white/2 border border-white/10 rounded-2xl p-5 backdrop-blur-sm shadow-xl overflow-hidden"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur opacity-20 rounded-2xl"></div>
                <div className="relative z-10">
                  {/* header */}
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold">{sch.name}</h3>
                    <div className="text-xs text-gray-300">{formatDate(sch.deadline)}</div>
                  </div>

                  {/* meta */}
                  <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-300">
                    {sch.country && (<span className="inline-flex items-center gap-1"><FiMapPin />{sch.country}</span>)}
                    {sch.hostCountry && (<span className="inline-flex items-center gap-1"><FiGlobe />{sch.hostCountry}</span>)}
                  </div>

                  {/* content */}
                  {editing ? (
                    <div className="mt-4 space-y-2">
                      <input className="w-full rounded-md px-3 py-2 bg-black/10 text-white" value={editData.name} onChange={(e)=>setEditData({...editData, name: e.target.value})}/>
                      <input className="w-full rounded-md px-3 py-2 bg-black/10 text-white" value={editData.country} onChange={(e)=>setEditData({...editData, country: e.target.value})}/>
                      <input className="w-full rounded-md px-3 py-2 bg-black/10 text-white" value={editData.hostCountry} onChange={(e)=>setEditData({...editData, hostCountry: e.target.value})}/>
                      <textarea className="w-full rounded-md px-3 py-2 bg-black/10 text-white" rows={4} value={editData.details} onChange={(e)=>setEditData({...editData, details: e.target.value})}/>
                      <div className="flex gap-2">
                        <button disabled={busyId===sch.id} onClick={saveEdit} className="px-3 py-2 rounded-md bg-indigo-600">Save</button>
                        <button onClick={()=>setEditingId(null)} className="px-3 py-2 rounded-md bg-white/5">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className={`mt-4 text-sm leading-relaxed text-gray-200 ${!isExpanded ? "line-clamp-4" : ""}`}>
                        {sch.details || "No description provided."}
                      </p>

                      {sch.details && (
                        <button onClick={()=>toggle(sch.id)} className="mt-3 text-indigo-300 text-sm font-medium">
                          {isExpanded ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </>
                  )}

                  {/* link + admin actions */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      {sch.link && (
                        <a href={sch.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-indigo-200 text-sm">
                          <FiExternalLink /> Visit
                        </a>
                      )}
                    </div>

                    {isAdmin && !editing && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => beginEdit(sch)} className="p-2 bg-white/6 rounded-md hover:bg-white/10">
                          <FiEdit />
                        </button>
                        <button onClick={() => handleDelete(sch.id)} disabled={busyId===sch.id} className="p-2 bg-white/6 rounded-md hover:bg-red-600/30">
                          <FiTrash2 />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
