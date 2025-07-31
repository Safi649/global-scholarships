import Navbar from '../components/Navbar';
import Head from 'next/head';

export default function Submit() {
  return (
    <>
      <Head>
        <title>Submit – Global Scholarships</title>
      </Head>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Submit a Scholarship</h1>
        <p>If you know about a scholarship opportunity, please submit the details below (form coming soon).</p>
      </main>
    </>
  );
}

