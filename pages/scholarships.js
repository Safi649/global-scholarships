// scholarships.js

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      const querySnapshot = await getDocs(collection(db, "scholarships"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setScholarships(data);
    };
    fetchScholarships();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Latest Scholarships</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {scholarships.map((sch) => (
          <div
            key={sch.id}
            className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{sch.title}</h2>
            <p className="text-gray-600 mb-4">{sch.description}</p>
            {sch.link && (
              <a
                href={sch.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Visit Scholarship
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
