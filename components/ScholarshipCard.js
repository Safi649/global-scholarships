export default function ScholarshipCard({ title, country, degree, deadline, funded }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-600">🌍 {country} | 🎓 {degree}</p>
      <p className="text-sm text-gray-600">📅 Deadline: {deadline}</p>
      <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
        {funded}
      </span>
    </div>
  );
}
