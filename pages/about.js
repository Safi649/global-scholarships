// 📁 pages/about.js
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900 px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700"
        >
          About Global Scholarships
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-xl mb-14 leading-relaxed text-gray-700 max-w-3xl mx-auto"
        >
          Global Scholarships is a platform dedicated to sharing international scholarship opportunities
          with students around the world. Our mission is to empower talented individuals by providing access
          to verified educational programs, enabling them to achieve their dreams and build a brighter future.
        </motion.p>

        {/* Team Heading */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl font-semibold mb-10 text-gray-800"
        >
          Management Team
        </motion.h2>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* M Abbas Safi */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center p-8 border rounded-2xl shadow-lg bg-white hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <Image
              src="/abbas.jpg"
              alt="M Abbas Safi"
              width={220}
              height={220}
              unoptimized
              className="rounded-full object-cover shadow-md"
            />
            <h3 className="text-2xl font-bold mt-6 text-gray-900">M Abbas Safi</h3>
            <p className="text-blue-600 font-medium">Founder & Web Developer</p>
            <p className="text-sm text-gray-500 mt-1">muhammadabbassafi332@gmail.com</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-700">
              M Abbas Safi is the visionary founder and owner of the Global Scholarships website. 
              He is a skilled web developer with expertise in modern technologies and is passionate 
              about making education accessible worldwide. His dedication ensures the platform remains 
              reliable, up-to-date, and student-focused.
            </p>
          </motion.div>

          {/* Muhammad Hissan */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center p-8 border rounded-2xl shadow-lg bg-white hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <Image
              src="/friend1.jpg"
              alt="Muhammad Hissan"
              width={220}
              height={220}
              unoptimized
              className="rounded-full object-cover shadow-md"
            />
            <h3 className="text-2xl font-bold mt-6 text-gray-900">Muhammad Hissan</h3>
            <p className="text-blue-600 font-medium">Manager & Group Controller</p>
            <p className="text-sm text-gray-500 mt-1">hisanawan1011@gmail.com</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-700">
              Muhammad Hissan serves as the manager and controller of the Global Scholarships group and website. 
              His dedication, leadership, and organizational skills help maintain a growing community of scholarship seekers. 
              He ensures smooth operation of the platform while supporting students in navigating scholarship opportunities effectively.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
