// 📁 components/layout.js
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {/* add top padding so page content doesn't hide behind sticky navbar */}
      <main className="pt-20 min-h-[calc(100vh-5rem)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
