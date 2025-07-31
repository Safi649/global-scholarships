import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import ScholarshipCard from '../components/ScholarshipCard';

const scholarships = [
  {
    title: "Chevening UK Scholarship",
    country: "United Kingdom",
    degree: "Master's",
    deadline: "Nov 7",
    funded: "Fully Funded"
  },
  {
    title: "MEXT Japan Scholarship",
    country: "Japan",
    degree: "Bachelor's, Master's",
    deadline: "May 31",
    funded: "Fully Funded"
  },
  {
    title: "Erasmus Mundus",
    country: "Europe",
    degree: "Master's",
    deadline: "Varies",
    funded: "Fully Funded"
  }
];

export default function Scholarships() {
  return (
    <>
      <Head>
        <title>Scholarships – Global Scholarships</title>
      </Head>
      <Navbar />
      <main className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Available Scholarships</h1>

        {/* 🔍 Search Filter UI */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <input
            type="text"
            placeholder="Search by country or title"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* 🧾 Scholarship Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scholarships.map((item, index) => (
            <ScholarshipCard key={index} {...item} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
