import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <Head>
        <title>Global Scholarships</title>
        <meta name="description" content="Discover global opportunities with fully funded international scholarships for Bachelor’s, Master’s, and PhD programs." />
      </Head>

      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center text-white px-6 py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-center leading-tight mb-6"
        >
          Unlock Your Future with <span className="text-yellow-400">Global Scholarships</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-lg md:text-xl text-center max-w-2xl mb-10 text-gray-200"
        >
          Explore fully funded opportunities around the world for Bachelors, Masters, and PhD programs. 100% free, always updated.
        </motion.p>

        <motion.a
          href="/scholarships"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-400 text-indigo-900 font-bold py-3 px-6 rounded-2xl text-lg shadow-xl hover:bg-yellow-300 transition"
        >
          🎓 Explore Scholarships
        </motion.a>
      </main>

      <Footer />
    </>
  );
}
