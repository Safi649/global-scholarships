import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../components/layout';

export default function About() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-700">About Global Scholarships</h1>
          <p className="text-lg md:text-xl mb-12 leading-relaxed">
            Global Scholarships is a platform dedicated to sharing international scholarship opportunities
            with students around the world. Our mission is to empower talented individuals by providing access
            to verified educational programs, enabling them to achieve their dreams and build a brighter future.
          </p>

          <h2 className="text-3xl font-semibold mb-8">Management Team</h2>

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
              <h3 className="text-2xl font-bold mt-4 text-gray-800">M Abbas Safi</h3>
              <p className="text-gray-600 font-medium">Founder & Web Developer</p>
              <p className="text-sm text-gray-500 mt-1">muhammadabbassafi332@gmail.com</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                M Abbas Safi is the visionary founder and owner of the Global Scholarships website. 
                He is a skilled web developer with expertise in modern technologies and is passionate 
                about making education accessible worldwide. His dedication ensures the platform remains 
                reliable, up-to-date, and student-focused.
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
              <h3 className="text-2xl font-bold mt-4 text-gray-800">Muhammad Hissan</h3>
              <p className="text-gray-600 font-medium">Manager & Group Controller</p>
              <p className="text-sm text-gray-500 mt-1">hisanawan1011@gmail.com</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                Muhammad Hissan serves as the manager and controller of the Global Scholarships group and website. 
                His dedication, leadership, and organizational skills help maintain a growing community of scholarship seekers. 
                He ensures smooth operation of the platform while supporting students in navigating scholarship opportunities effectively.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
