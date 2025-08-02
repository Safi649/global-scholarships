import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import { motion } from 'framer-motion';

// Dummy data (same as on the scholarships page)
const scholarships = [
  {
    id: 1,
    title: "DAAD Scholarships – Germany",
    level: "Master's",
    location: "Germany",
    deadline: "Oct 15, 2025",
    description: "Fully funded scholarships for international students to pursue Master’s degrees in Germany. Covers tuition, living, and travel.",
    link: "#"
  },
  {
    id: 2,
    title: "Chevening Scholarship – UK",
    level: "Master's",
    location: "United Kingdom",
    deadline: "Nov 7, 2025",
    description: "UK government scholarship that enables future leaders to study in the UK for free. Includes tuition, airfare, and stipend.",
    link: "#"
  },
  {
    id: 3,
    title: "Fulbright Scholarship – USA",
    level: "Bachelor / Master / PhD",
    location: "USA",
    deadline: "May 1, 2026",
    description: "One of the most prestigious international scholarships for academic excellence and leadership potential.",
    link: "#"
  }
];

export default function ScholarshipDetail() {
  const router = useRouter();
  const { id } = router.query;

  const scholarship = scholarships.find(s => s.id === parseInt(id));

  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <p className="text-xl">Scholarship not found.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{scholarship.title} | Global Scholarships</title>
      </Head>

      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 px-6 py-20 text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white text-gray-900 rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{scholarship.title}</h1>
          <p className="text-sm text-gray-600 mb-6">📍 {scholarship.location} | 🎓 {scholarship.level}</p>
          <p className="text-lg mb-4">{scholarship.description}</p>
          <p className="mb-6">🗓️ <strong>Deadline:</strong> {scholarship.deadline}</p>
          <a
            href={scholarship.link}
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Apply Now
          </a>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
