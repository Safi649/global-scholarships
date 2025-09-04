<div
  key={sch.id}
  className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
>
  {/* Decorative gradient header */}
  <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

  <div className="p-6">
    {editingId === sch.id ? (
      // ✏️ Editing mode
      <div className="space-y-3">
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          placeholder="Title"
        />
        <textarea
          value={editData.description}
          onChange={(e) =>
            setEditData({ ...editData, description: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          placeholder="Description"
        />
        <input
          type="url"
          value={editData.link}
          onChange={(e) => setEditData({ ...editData, link: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          placeholder="Scholarship Link"
        />
        <div className="flex gap-3">
          <button
            onClick={handleSaveEdit}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-md"
          >
            Save
          </button>
          <button
            onClick={() => setEditingId(null)}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    ) : (
      // 📄 Normal card view
      <>
        <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
          {sch.title}
        </h2>
        <p className="text-gray-600 mt-3 leading-relaxed line-clamp-3">
          {sch.description}
        </p>
        {sch.link && (
          <a
            href={sch.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-indigo-600 font-semibold hover:underline"
          >
            🌐 Visit Scholarship
          </a>
        )}

        {/* 🔐 Admin actions */}
        {isAdmin && (
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => handleEditClick(sch)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 shadow-md"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(sch.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md"
            >
              Delete
            </button>
          </div>
        )}
      </>
    )}
  </div>
</div>
