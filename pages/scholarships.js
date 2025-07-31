import Navbar from '../components/Navbar';
import Head from 'next/head';

export default function Scholarships() {
  return (
    <>
      <Head>
        <title>Scholarships – Global Scholarships</title>
      </Head>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Scholarships</h1>
        <p>Here you will find a list of all international scholarships we share. Filters will be added soon!</p>

        <ul className="mt-6 list-disc list-inside space-y-2">
          <li><strong>Chevening UK Scholarship</strong> – Master’s – Deadline: Nov 7</li>
          <li><strong>MEXT Japan Scholarship</strong> – Bachelor’s, Master’s – Deadline: May 31</li>
          <li><strong>Erasmus Mundus</strong> – Fully Funded – Deadline: Varies</li>
        </ul>
      </main>
    </>
  );
}

