import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"   // ✅ make sure logo.png is inside /public
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
        </div>
      </div>
    </nav>
  );
}
