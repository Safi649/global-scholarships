import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Global Scholarships</title>
      </Head>
      <Navbar />
      <main className="p-6 bg-gray-50 min-h-screen text-gray-800">
        <h1 className="text-4xl font-bold mb-4">Welcome to Global Scholarships</h1>
        <p className="text-lg mb-6">Find and apply for fully funded international scholarships in seconds.</p>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">🎓 Featured Scholarships</h2>
          <ul className="list-disc list-inside">
            <li>DAAD Germany Scholarship – Masters – Deadline: Aug 31</li>
            <li>Turkiye Burslari – Fully Funded – Deadline: Feb 20</li>
            <li>Fulbright USA – PhD – Deadline: May 15</li>
          </ul>
        </div>
      </main>
    </>
  );
}

