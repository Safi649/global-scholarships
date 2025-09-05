import Head from "next/head";
import Layout from "../components/layout";

export default function Privacy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | Global Scholarships</title>
        <meta
          name="description"
          content="Read the Privacy Policy of Global Scholarships, how we handle your data and protect your information."
        />
      </Head>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-12">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="mb-4">
          At <strong>Global Scholarships</strong>, we value your privacy. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Information We Collect</h2>
        <p className="mb-4">
          We may collect information such as your email address, feedback, or other data you voluntarily provide when using our website or subscribing to updates.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
        <p className="mb-4">
          Your information is used to provide a better experience, improve our website, respond to inquiries, and share scholarship updates.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Cookies</h2>
        <p className="mb-4">
          We may use cookies to enhance your browsing experience. You can control cookies through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Third-Party Services</h2>
        <p className="mb-4">
          We may use third-party services for analytics or ads (such as Google AdSense). These services may collect information automatically. We encourage you to review their privacy policies.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, you can contact us at{" "}
          <a href="mailto:safi65225@gmail.com" className="text-blue-600 hover:underline">
            safi65225@gmail.com
          </a>.
        </p>
      </div>
    </Layout>
  );
}
