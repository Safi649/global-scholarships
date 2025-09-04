{/* Desktop auth actions */}
<div className="hidden md:flex md:items-center md:space-x-3">
  {!user ? (
    <>
      <Link
        href="/login"
        className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        <FiLogIn />
        <span className="ml-1">Login</span>
      </Link>
      <Link
        href="/register"
        className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
      >
        <FiUserPlus />
        <span className="ml-1">Register</span>
      </Link>
    </>
  ) : (
    <>
      <span className="text-sm text-gray-600 hidden sm:inline">
        Hi, {user.email.split("@")[0]}
      </span>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
      >
        <FiLogOut />
        <span className="ml-1">Logout</span>
      </button>
    </>
  )}
</div>
