// 📁 pages/index.js
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import Layout from '../components/layout';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <Layout>
      <main className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800 text-white font-sans">
        
        {/* Hero Section */}
        <section className="text-center py-20 px-6">
          <div className="flex justify-center mb-6">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={64} 
              height={64} 
              unoptimized // 🔑 important for Netlify
            />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Global Scholarships for Students
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Discover, apply, and win scholarships from top global universities.
          </motion.p>
          <motion.div 
            initial={{ scale: 0.8 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: 1 }}
          >
            <Link 
              href="/scholarships" 
              className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition"
            >
              Browse Scholarships
            </Link>
          </motion.div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white text-gray-900">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10 text-center">
            <motion.div whileHover={{ scale: 1.05 }}>
              <h3 className="text-xl font-bold mb-2">🔍 Search Scholarships</h3>
              <p>Filter by country, level, or field to find the right opportunity.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <h3 className="text-xl font-bold mb-2">📝 Easy Applications</h3>
              <p>Get direct links and tips for a successful application.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <h3 className="text-xl font-bold mb-2">📢 Daily Updates</h3>
              <p>Stay updated with fresh international scholarships.</p>
            </motion.div>
          </div>
        </section>

        {/* Popular Scholarships */}
        <section className="py-20 px-6 bg-indigo-800 text-center">
          <h2 className="text-3xl font-bold mb-10">Popular Scholarships</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {["USA", "UK", "Canada"].map((country, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white text-black p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-bold">{country} Scholarships</h3>
                <p className="text-sm mt-2">Top programs for {country} in 2025.</p>
                <Link 
                  href="/scholarships" 
                  className="text-blue-600 underline mt-4 inline-block"
                >
                  Explore
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-6 bg-gray-100 text-gray-900 text-center">
          <h2 className="text-3xl font-bold mb-6">About Global Scholarships</h2>
          <p className="max-w-3xl mx-auto">
            Our mission is to empower students globally by providing access to verified scholarship opportunities. 
            Whether you're pursuing undergraduate or PhD, we help you succeed.
          </p>
        </section>

        {/* WhatsApp Group Join Button */}
        <section className="text-center py-12 bg-white">
          <a
            href="https://chat.whatsapp.com/Ll89aBgITG74uXzrSuoyKb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-600 transition"
          >
            <FaWhatsapp size={20} />
            Join WhatsApp Group
          </a>
        </section>
      </main>
    </Layout>
  );
}
