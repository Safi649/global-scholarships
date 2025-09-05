import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"   // ✅ must be inside public/
          alt="Global Scholarships Logo"
          width={40}
          height={40}
          unoptimized       // ✅ important if Netlify complains
          className="rounded-md"
        />
        <span className="text-xl font-bold text-blue-700">Global Scholarships</span>
      </Link>

      {/* Menu */}
      <div className="flex gap-6 font-medium text-gray-700">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/scholarships">Scholarships</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
