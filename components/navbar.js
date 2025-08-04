import Link from 'next/link';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';

export default function Navbar() {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Global Scholarships" width={40} height={40} />
          <span className="text-xl font-bold text-blue-700">Global Scholarships</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm font-medium text-gray-700 items-center">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          <Link href="/terms" className="hover:text-blue-600">Terms</Link>
          <Link href="/disclaimer" className="hover:text-blue-600">Disclaimer</Link>

          {!user ? (
            <>
              <Link href="/login" className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                <FiLogIn />
                <span>Login</span>
              </Link>
              <Link href="/register" className="flex items-center space-x-1 text-green-600 hover:text-green-800">
                <FiUserPlus />
                <span>Register</span>
              </Link>
            </>
          ) : (
            <>
              <span className="text-xs text-gray-600 hidden sm:inline">Hi, {user.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-600 hover:text-red-800"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
