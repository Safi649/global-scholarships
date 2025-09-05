import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase"; // ✅ make sure firebase.js is set up

export default function Navbar() {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Global Scholarships Logo"
          width={40}
          height={40}
          unoptimized
          className="rounded-md"
        />
        <span className="text-xl font-bold text-blue-700">
          Global Scholarships
        </span>
      </Link>

      {/* Menu */}
      <div className="flex gap-6 font-medium text-gray-700 items-center">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/scholarships">Scholarships</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/disclaimer">Disclaimer</Link>

        {/* Auth Buttons */}
        <div className="flex gap-3 ml-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-md hover:from-pink-600 hover:to-purple-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow-md hover:from-red-600 hover:to-red-800 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
