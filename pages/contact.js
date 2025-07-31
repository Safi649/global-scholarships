import Navbar from '../components/Navbar';
import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact – Global Scholarships</title>
      </Head>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p>📩 Email: globalscholarships@example.com</p>
        <p className="mt-2">📱 Join our <a href="https://t.me/yourgroup" className="text-blue-600 underline">Telegram Group</a></p>
      </main>
    </>
  );
}

