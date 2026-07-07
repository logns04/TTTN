import { FileText, Plus, Copy, Pencil, Trash2 } from "lucide-react";

export default function Admin({ pages, setPages, openEditor, openView }) {
  const handleCopy = (page) => {
    const copy = {
      ...page,
      id: crypto.randomUUID(),
      lang: page.lang === "vi" ? "en" : "vi",
      updated: new Date().toLocaleDateString("vi-VN"),
    };

    setPages([...pages, copy]);
  };

  const handleDelete = (id) => {
    if (!confirm("Bạn có chắc muốn xóa Page này?")) return;

    setPages(pages.filter((page) => page.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      {/* Header */}

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-4xl font-bold">
            <FileText size={34} />
            Quản lý Pages
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Tạo và quản lý các trang với PUCK Visual Builder
          </p>
        </div>

        <button
          onClick={() => openEditor()}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-white transition hover:bg-blue-700"
        >
          <Plus size={20} />
          Tạo Page Mới
        </button>
      </div>

      {/* Filter */}

      <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="mb-2 block text-lg">Ngôn ngữ</label>

            <select className="w-full rounded-xl border px-4 py-4 outline-none">
              <option>Tất cả</option>
              <option>VI</option>
              <option>EN</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-lg">Trạng thái</label>

            <select className="w-full rounded-xl border px-4 py-4 outline-none">
              <option>Tất cả</option>
              <option>Đã xuất bản</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-lg">Ngày cập nhật</label>

            <input
              type="date"
              className="w-full rounded-xl border px-4 py-4 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="border-b bg-slate-50 text-slate-500">
            <tr>
              <th className="p-6 text-left">TIÊU ĐỀ</th>
              <th className="text-left">SLUG</th>
              <th className="text-left">NGÔN NGỮ</th>
              <th className="text-left">TRẠNG THÁI</th>
              <th className="text-left">CẬP NHẬT</th>
              <th className="text-center">THAO TÁC</th>
            </tr>
          </thead>

          <tbody>
            {pages.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-10 text-center text-slate-400">
                  Chưa có Page nào
                </td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr key={page.id} className="border-b">
                  <td className="p-6">
                    <div className="flex gap-4">
                      <FileText size={22} className="mt-1 text-slate-400" />

                      <div>
                        <button
                          onClick={() => openView(page)}
                          className="text-left text-xl font-semibold transition hover:text-blue-600"
                        >
                          {page.title}
                        </button>

                        <div className="text-slate-500">SEO: {page.seo}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="rounded bg-slate-100 px-3 py-2 font-mono">
                      {page.slug}
                    </span>
                  </td>

                  <td>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                      {page.lang?.toUpperCase()}
                    </span>
                  </td>

                  <td>
                    <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                      {page.status}
                    </span>
                  </td>

                  <td>{page.updated}</td>

                  <td>
                    <div className="flex justify-center gap-5">
                      <Copy
                        size={20}
                        className="cursor-pointer text-indigo-600"
                        onClick={() => handleCopy(page)}
                      />

                      <Pencil
                        size={20}
                        className="cursor-pointer text-blue-600"
                        onClick={() => openEditor(page)}
                      />

                      <Trash2
                        size={20}
                        className="cursor-pointer text-red-600"
                        onClick={() => handleDelete(page.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
