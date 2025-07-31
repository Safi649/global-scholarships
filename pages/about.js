import Navbar from '../components/Navbar';
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About – Global Scholarships</title>
      </Head>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">About Global Scholarships</h1>
        <p>
          Global Scholarships is a platform created by a community of students to share and promote international
          scholarship opportunities for Bachelor's, Master's, and PhD degrees.
        </p>
        <p className="mt-2">
          Our mission is to make global education accessible by making scholarships easy to find and apply for — all in one place.
        </p>
      </main>
    </>
  );
}

