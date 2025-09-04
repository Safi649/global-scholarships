import Head from "next/head";
import Navbar from "../components/navbar"; // make sure Navbar is a default export
import Footer from "../components/footer";

export default function Submit() {
  return (
    <>
      <Head>
        <title>Submit – Global Scholarships</title>
      </Head>

      <Navbar />

      <main className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
          🎓 Submit a Scholarship
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          If you know about a scholarship opportunity, please submit the details
          below. (Submission form coming soon 🚀)
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
          <p className="text-gray-500 text-center">
            📌 Scholarship submission feature is under development.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
