// 📁 pages/about.js
import Image from "next/image";
import { motion } from "framer-motion";
import Head from "next/head";
import Layout from "../components/layout";

export default function About() {
  return (
    <Layout>
      <Head>
        {/* ✅ SEO Meta Tags */}
        <title>About Us | Global Scholarships</title>
        <meta
          name="description"
          content="Learn about Global Scholarships, our mission to provide verified scholarship opportunities, and meet the dedicated management team behind the platform."
        />
        <link rel="canonical" href="https://global-scholarships.netlify.app/about" />

        {/* ✅ Open Graph / Social Sharing */}
        <meta property="og:title" content="About Global Scholarships" />
        <meta
          property="og:description"
          content="Discover the mission of Global Scholarships and meet the team working to make education accessible worldwide."
        />
        <meta property="og:url" content="https://global-scholarships.netlify.app/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Global Scholarships" />
        <meta
          name="twitter:description"
          content="Global Scholarships is dedicated to helping students worldwide find and apply for international scholarships."
        />
        <meta name="twitter:image" content="/logo.png" />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-blue-700"
          >
            About Global Scholarships
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            Global Scholarships is a platform dedicated to sharing international
            scholarship opportunities with students around the world. Our mission
            is to empower talented individuals by providing access to verified
            educational programs, enabling them to achieve their dreams and build
            a brighter future.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-semibold mb-8"
          >
            Management Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* M Abbas Safi */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-6 border rounded-2xl shadow-lg bg-white hover:shadow-2xl transition"
            >
              <Image
                src="/abbas.jpg"
                alt="M Abbas Safi"
                width={200}
                height={200}
                unoptimized
                className="rounded-full object-cover"
              />
              <h3 className="text-2xl font-bold mt-4 text-gray-800">
                M Abbas Safi
              </h3>
              <p className="text-gray-600 font-medium">
                Founder & Web Developer
              </p>
              <p className="text-sm text-gray-500 mt-1">
                muhammadabbassafi332@gmail.com
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                M Abbas Safi is the visionary founder and owner of the Global
                Scholarships website. He is a skilled web developer with
                expertise in modern technologies and is passionate about making
                education accessible worldwide. His dedication ensures the
                platform remains reliable, up-to-date, and student-focused.
              </p>
            </motion.div>

            {/* Muhammad Hissan */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-6 border rounded-2xl shadow-lg bg-white hover:shadow-2xl transition"
            >
              <Image
                src="/friend1.jpg"
                alt="Muhammad Hissan"
                width={200}
                height={200}
                unoptimized
                className="rounded-full object-cover"
              />
              <h3 className="text-2xl font-bold mt-4 text-gray-800">
                Muhammad Hissan
              </h3>
              <p className="text-gray-600 font-medium">
                Manager & Group Controller
              </p>
              <p className="text-sm text-gray-500 mt-1">
                hisanawan1011@gmail.com
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                Muhammad Hissan serves as the manager and controller of the
                Global Scholarships group and website. His dedication,
                leadership, and organizational skills help maintain a growing
                community of scholarship seekers. He ensures smooth operation of
                the platform while supporting students in navigating scholarship
                opportunities effectively.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
