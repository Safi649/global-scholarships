// components/Navbar.js (or inside pages/index.js if it's inline)

import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow bg-white">
      <div className="flex items-center space-x-3">
        <Image
          src="/logo.png" // ✅ Make sure this file exists: /public/logo.png
          alt="Global Scholarships Logo"
          width={120}
          height={40}
          className="object-contain"
        />
        <span className="font-bold text-lg text-gray-800">Global Scholarships</span>
      </div>

      <div className="flex space-x-4">
        <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
        <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
        <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
      </div>
    </nav>
  );
}
