import React from 'react';

export default function footer() {
  return (
    <footer className="bg-gray-100 py-8 text-center text-gray-600">
      {/* 🌐 Legal Navigation Links */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        <a href="/about" className="hover:underline">
          About
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
        <a href="/terms" className="hover:underline">
          Terms
        </a>
        <a href="/disclaimer" className="hover:underline">
          Disclaimer
        </a>
      </div>

      {/* 📌 Copyright */}
      <p className="mt-4 text-xs">
        &copy; {new Date().getFullYear()} Global Scholarships. All rights reserved.
      </p>
    </footer>
  );
}
