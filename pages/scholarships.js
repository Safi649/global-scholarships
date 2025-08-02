import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Layout from '../components/layout';
import { useState } from 'react';
import { motion } from 'framer-motion';

const scholarships = [
  {
    id: 1,
    title: "DAAD Scholarships – Germany",
    level: "Master's",
    location: "Germany",
    deadline: "Oct 15, 2025",
    link: "#",
  },
  {
    id: 2,
    title: "Chevening Scholarship – UK",
    level: "Master's",
    location: "United Kingdom",
    deadline: "Nov 7, 2025",
    link: "#",
  },
  {
    id: 3,
    title: "Fulbright Scholarship – USA",
    level: "Bachelor / Master / PhD",
    location: "USA",
    deadline: "May 1, 2026",
    link: "#",
  },
  // ➕ Add more scholarships here
];

export default function Scholarships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const filtered = scholarships.filter(s => {
    return (
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (levelFilter ? s.level.toLowerCase().includes(levelFilter.toLowerCase()) : true) &&
      (locationFilter ? s.location.toLowerCase().includes(locationFilter.toLowerCase()) : true)
    );
  });

  return (
    <>
      <Head>
        <title>Scholarships | Global Scholarships</title>
        <meta name="description" content="Find international fully funded scholarships for Bachelor’s, Master’s, and PhD programs." />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-pink-900 via-purple-900 to-indigo-900 px-6 py-20 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10"
        >
          🌍 International Scholarships
        </motion.h1>

        {/* 🔎 Search & Filter Bar */}
        <div className="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="🔍 Search by title..."
            className="px-4 py-2 rounded-xl w-full md:w-1/3 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-xl text-black w-full md:w-1/4"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="">🎓 All Levels</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
          </select>
          <select
            className="px-4 py-2 rounded-xl text-black w-full md:w-1/4"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">🌐 All Locations</option>
            <option value="Germany">Germany</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
        </div>

        {/* 🎓 Scholarship Cards */}
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center col-span-full text-gray-200">No scholarships match your search.</p>
          ) : (
            filtered.map((scholarship, index) => (
              <motion.div
                key={scholarship.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white text-gray-800 rounded-2xl shadow-xl p-6 hover:scale-105 hover:shadow-2xl transition duration-300"
              >
                <h2 className="text-xl font-bold mb-2">{scholarship.title}</h2>
                <p className="text-sm mb-1">🎓 Level: <span className="font-medium">{scholarship.level}</span></p>
                <p className="text-sm mb-1">📍 Location: {scholarship.location}</p>
                <p className="text-sm mb-4">🗓️ Deadline: {scholarship.deadline}</p>
                <a
                  href={scholarship.link}
                  className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
                >
                  Apply Now
                </a>
              </motion.div>
            ))
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
