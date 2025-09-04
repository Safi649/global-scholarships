// 📁 pages/about.js
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../components/layout';

export default function About() {
  return (
    <Layout>
      <div className="min-h-screen bg-white text-gray-900 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">About Global Scholarships</h1>
          <p className="text-lg mb-10">
            Global Scholarships is a platform dedicated to sharing international scholarship opportunities
            with students around the world. We aim to help talented individuals access quality education and
            build a better future.
          </p>

          <h2 className="text-2xl font-semibold mb-6">Management Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Abbas Safi */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-6 border rounded-xl shadow-md bg-gray-50"
            >
              <Image
                src="/abbas.jpg"
                alt="M Abbas Safi"
                width={200}
                height={200}
                unoptimized
                className="rounded-full object-cover"
              />
              <h3 className="text-xl font-bold mt-4">M Abbas Safi</h3>
              <p className="text-gray-600">Founder & Web Developer</p>
              <p className="text-sm text-gray-500 mt-1">muhammadabbassafi332@gmail.com</p>
              <p className="mt-2 text-sm leading-relaxed">
                M Abbas Safi is the visionary founder and owner of the Global Scholarships website. 
                He is a skilled web developer with expertise in modern technologies, 
                passionate about making education accessible worldwide.
              </p>
            </motion.div>

            {/* Muhammad Hissan */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-6 border rounded-xl shadow-md bg-gray-50"
            >
              <Image
                src="/friend1.jpg"
                alt="Muhammad Hissan"
                width={200}
                height={200}
                unoptimized
                className="rounded-full object-cover"
              />
              <h3 className="text-xl font-bold mt-4">Muhammad Hissan</h3>
              <p className="text-gray-600">Manager & Group Controller</p>
              <p className="text-sm text-gray-500 mt-1">hisanawan1011@gmail.com</p>
              <p className="mt-2 text-sm leading-relaxed">
                Muhammad Hissan serves as the manager and controller of the Global Scholarships group and website. 
                His dedication and leadership help in organizing and maintaining our growing community of scholarship seekers.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
