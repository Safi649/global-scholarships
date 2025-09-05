// pages/privacy.js
import Layout from "../components/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">
          Privacy Policy
        </h1>
        <p className="mb-4">
          At <strong>Global Scholarships</strong>, accessible from
          global-scholarships.netlify.app, we value the privacy of our visitors.
          This Privacy Policy document describes the types of information that
          is collected and recorded by us and how we use it.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information such as your name, email address,
          and any details you submit through contact forms. Additionally,
          non-personal information like browser type, device information, and
          pages visited may be collected for analytics purposes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>To improve our website and user experience</li>
          <li>To provide scholarship updates and notifications</li>
          <li>To respond to inquiries and support requests</li>
          <li>To comply with legal requirements</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Cookies</h2>
        <p className="mb-4">
          Our website may use cookies to store information about visitor
          preferences and to enhance user experience. You can choose to disable
          cookies through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Third-Party Ads</h2>
        <p className="mb-4">
          We may use third-party vendors, including Google, that use cookies to
          serve ads based on users’ previous visits. Google’s use of the DART
          cookie enables it and its partners to serve ads to you based on your
          visit to our site and other sites on the internet.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Consent</h2>
        <p className="mb-4">
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>
      </div>
    </Layout>
  );
}
