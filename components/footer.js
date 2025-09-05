import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 text-center text-gray-600">
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        <a href="/about" className="hover:underline">About</a>
        <a href="/contact" className="hover:underline">Contact</a>
        <a href="/terms" className="hover:underline">Terms</a>
        <a href="/disclaimer" className="hover:underline">Disclaimer</a>
        <a href="/privacy" className="hover:underline">Privacy</a>
        <a href="/review" className="hover:underline">Review</a>
      </div>
      <p className="mt-4 text-xs">
        &copy; {new Date().getFullYear()} Global Scholarships. All rights reserved.
      </p>
    </footer>
  );
}
