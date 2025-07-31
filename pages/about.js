import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="min-h-screen bg-white py-16 px-4 md:px-12 text-center">
      <h2 className="text-4xl font-bold mb-10 text-indigo-700">
        Meet Our Management Team
      </h2>
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* M Abbas Safi */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-md">
          <Image
            src="/abbas.jpg"
            alt="M Abbas Safi"
            width={300}
            height={300}
            className="mx-auto rounded-full object-cover"
          />
          <h3 className="text-2xl font-semibold mt-4">M Abbas Safi</h3>
          <p className="text-sm text-gray-600">Founder & Web Developer</p>
          <p className="mt-2 text-gray-700">📧 muhammadabbassafi332@gmail.com</p>
          <p className="mt-4 text-gray-600">
            M Abbas Safi is the visionary founder and talented web developer behind Global Scholarships.
            He created this platform to help students around the world find international scholarship opportunities easily and efficiently.
          </p>
        </div>

        {/* Muhammad Hisan */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-md">
          <Image
            src="/friend1.jpg"
            alt="Muhammad Hisan"
            width={300}
            height={300}
            className="mx-auto rounded-full object-cover"
          />
          <h3 className="text-2xl font-semibold mt-4">Muhammad Hisan</h3>
          <p className="text-sm text-gray-600">Manager & Group Controller</p>
          <p className="mt-2 text-gray-700">📧 hisanawan1011@gmail.com</p>
          <p className="mt-4 text-gray-600">
            Muhammad Hisan plays a key role as the manager and controller of our international scholarships group and website. His leadership ensures smooth operations, community growth, and timely updates to benefit all students.
          </p>
        </div>
      </div>
    </section>
  );
}
