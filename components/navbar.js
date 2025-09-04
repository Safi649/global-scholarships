// 📁 components/navbar.js
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { FiLogIn, FiUserPlus, FiLogOut, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Global Scholarships"
                width={40}
                height={40}
                unoptimized
              />
              <span className="text-lg font-semibold text-blue-700">
                Global Scholarships
              </span>
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/" className="text-sm hover:text-blue-600">Home</Link>
            <Link href="/about" className="text-sm hover:text-blue-600">About</Link>
            <Link href="/scholarships" className="text-sm hover:text-blue-600">Scholarships</Link>
            <Link href="/contact" className="text-sm hover:text-blue-600">Contact</Link>
            <Link href="/terms" className="text-sm hover:text-blue-600">Terms</Link>
            <Link href="/disclaimer" className="text-sm hover:text-blue-600">Disclaimer</Link>
          </div>

          {/* Desktop auth actions */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {!user ? (
              <>
                <Link href="/login" className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                  <FiLogIn />
                  <span className="ml-1">Login</span>
                </Link>
                <Link href="/register" className="flex items-center space-x-1 text-green-600 hover:text-green-800">
                  <FiUserPlus />
                  <span className="ml-1">Register</span>
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-600 hidden sm:inline">Hi, {user.email.split("@")[0]}</span>
                <button onClick={handleLogout} className="flex items-center space-x-1 text-red-600 hover:text-red-800">
                  <FiLogOut />
                  <span className="ml-1">Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <Link href="/" className="block px-2 py-2 rounded hover:bg-gray-100">Home</Link>
            <Link href="/about" className="block px-2 py-2 rounded hover:bg-gray-100">About</Link>
            <Link href="/scholarships" className="block px-2 py-2 rounded hover:bg-gray-100">Scholarships</Link>
            <Link href="/contact" className="block px-2 py-2 rounded hover:bg-gray-100">Contact</Link>
            <Link href="/terms" className="block px-2 py-2 rounded hover:bg-gray-100">Terms</Link>
            <Link href="/disclaimer" className="block px-2 py-2 rounded hover:bg-gray-100">Disclaimer</Link>

            {!user ? (
              <>
                <Link href="/login" className="block px-2 py-2 rounded text-blue-600 hover:bg-gray-100">Login</Link>
                <Link href="/register" className="block px-2 py-2 rounded text-green-600 hover:bg-gray-100">Register</Link>
              </>
            ) : (
              <>
                <div className="px-2 py-2 text-sm text-gray-700">Signed in as <span className="font-medium">{user.email}</span></div>
                <button onClick={handleLogout} className="w-full text-left px-2 py-2 rounded text-red-600 hover:bg-gray-100">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
