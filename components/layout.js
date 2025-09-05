import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {/* Top padding to prevent content being hidden behind sticky navbar */}
      <main className="pt-24 min-h-[calc(100vh-5rem)] bg-gray-50">
        {children}
      </main>
      <Footer />
    </>
  );
}
