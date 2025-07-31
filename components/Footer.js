export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-4 mt-12">
      <div className="max-w-7xl mx-auto text-center text-sm px-4">
        © {new Date().getFullYear()} Global Scholarships. All rights reserved.
        <div className="mt-2">
          Built with 💙 by the Global Scholarships Team
        </div>
      </div>
    </footer>
  );
}
