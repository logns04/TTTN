import { FileText, Plus, Copy, Pencil, Trash2 } from "lucide-react";

export default function Admin({
  pages,
  setPages,
  openEditor,
  openView,
}) {

  // =============================
  // Tạo bản dịch
  // =============================

  const handleTranslate = (page) => {

    const targetLang = page.lang === "vi" ? "en" : "vi";

    const group = page.translationGroup || page.slug || page.id;

    // Kiểm tra đã có bản dịch chưa
    const exist = pages.find(
      (p) =>
        p.translationGroup === group &&
        p.lang === targetLang
    );

    if (exist) {
      alert(
        `Đã tồn tại bản ${
          targetLang.toUpperCase()
        }`
      );
      return;
    }

    const translation = {

      ...page,

      id: crypto.randomUUID(),

      translationGroup: group,

      lang: targetLang,

      title: "",

      seo: "",

      status: "Draft",

      updated: new Date().toLocaleDateString("vi-VN"),

    };

    const newPages = pages.map((p) =>
      p.id === page.id
        ? {
            ...p,
            translationGroup: group,
          }
        : p
    );

    setPages([...newPages, translation]);

    alert(
      `Đã tạo bản ${targetLang.toUpperCase()}`
    );

  };

  // =============================
  // Xóa
  // =============================

  const handleDelete = (id) => {

    if (!confirm("Bạn có chắc muốn xóa?"))
      return;

    setPages(
      pages.filter((page) => page.id !== id)
    );

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

            Tạo và quản lý các trang bằng Puck

          </p>

        </div>

        <button
          onClick={() => openEditor()}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-white hover:bg-blue-700"
        >

          <Plus size={20} />

          Tạo Page

        </button>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="p-5 text-left">
                Tiêu đề
              </th>

              <th className="text-left">
                Slug
              </th>

              <th className="text-left">
                Lang
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Updated
              </th>

              <th className="text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {pages.length === 0 && (

              <tr>

                <td
                  colSpan="6"
                  className="p-10 text-center text-slate-400"
                >

                  Chưa có Page

                </td>

              </tr>

            )}

            {pages.map((page) => (

              <tr
                key={page.id}
                className="border-t"
              >

                <td className="p-5">

                  <button
                    className="font-semibold hover:text-blue-600"
                    onClick={() => openView(page)}
                  >

                    {page.title || "(No title)"}

                  </button>

                  <div className="text-sm text-slate-400">

                    {page.seo}

                  </div>

                </td>

                <td>{page.slug}</td>

                <td>

                  <span className="rounded bg-blue-100 px-3 py-1">

                    {page.lang?.toUpperCase()}

                  </span>

                </td>

                <td>{page.status}</td>

                <td>{page.updated}</td>

                <td>

                  <div className="flex justify-center gap-5">

                    {/* Translation */}

                    <Copy
                      size={20}
                      className="cursor-pointer text-indigo-600"
                      title="Tạo bản dịch"
                      onClick={() =>
                        handleTranslate(page)
                      }
                    />

                    {/* Edit */}

                    <Pencil
                      size={20}
                      className="cursor-pointer text-blue-600"
                      onClick={() =>
                        openEditor(page)
                      }
                    />

                    {/* Delete */}

                    <Trash2
                      size={20}
                      className="cursor-pointer text-red-600"
                      onClick={() =>
                        handleDelete(page.id)
                      }
                    />

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );

}