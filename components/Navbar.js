import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Global Scholarships</h1>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/scholarships" className="hover:underline">Scholarships</Link>
          <Link href="/submit" className="hover:underline">Submit</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
