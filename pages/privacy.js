// pages/privacy.js
import Head from "next/head";
import Layout from "../components/layout";

export default function Privacy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | Global Scholarships</title>
        <meta
          name="description"
          content="Read the privacy policy of Global Scholarships. We value your privacy and data security."
        />
      </Head>

      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Privacy Policy</h1>

          <p className="mb-4 text-gray-700">
            At Global Scholarships, we value your privacy. All the personal information
            collected on our website is used solely for providing and improving our services.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4 text-gray-700">
            We may collect your name, email address, and review data when you submit reviews
            or contact us. We do not share your information with third parties except as
            required by law.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Use of Information</h2>
          <p className="mb-4 text-gray-700">
            Your information is used to manage scholarship reviews, respond to inquiries,
            and improve our website experience.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions regarding this Privacy Policy, please contact us at:
            <strong className="text-indigo-600"> info@globalscholarships.com</strong>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
