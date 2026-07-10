import { useState } from "react";
import { ArrowLeft, Save, Settings, X } from "lucide-react";

import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";

import { config } from "../puck/config";

export default function Editor({ page, back, save }) {
  const [openSetting, setOpenSetting] = useState(false);

  // =============================
  // Page Info
  // =============================

  const [form, setForm] = useState(
    page || {
      id: crypto.randomUUID(),

      // Nhóm bản dịch
      translationGroup: crypto.randomUUID(),

      title: "",

      seo: "",

      slug: "",

      lang: "vi",

      status: "Published",

      updated: "",
    }
  );

  // =============================
  // Puck Data
  // =============================

  const [data, setData] = useState(
    page?.data || {
      content: [],
      root: {
        props: {},
      },
    }
  );

  // =============================
  // Publish
  // =============================

  const publish = () => {
    save({
      ...form,

      data,

      updated: new Date().toLocaleDateString("vi-VN"),
    });
  };

  return (
    <div className="flex h-screen flex-col bg-slate-100">

      {/* Header */}

      <div className="flex h-16 items-center justify-between border-b bg-white px-6">

        <div className="flex items-center gap-4">

          <button
            onClick={back}
            className="rounded-lg border p-2 hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
          </button>

          <h1 className="text-2xl font-bold">
            {page ? "Chỉnh sửa Page" : "Tạo Page"}
          </h1>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => setOpenSetting(true)}
            className="rounded-xl border px-5 hover:bg-slate-100"
          >
            <Settings size={18} />
          </button>

          <button
            onClick={publish}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 text-white"
          >
            <Save size={18} />
            Publish
          </button>

        </div>

      </div>

      {/* Puck */}

      <div className="flex-1 overflow-hidden">
        <Puck
          config={config}
          data={data}
          onChange={setData}
        />
      </div>

      {/* Setting */}

      {openSetting && (

        <div className="fixed inset-0 z-40">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenSetting(false)}
          />

          <div className="absolute left-0 top-0 h-full w-96 bg-white shadow-xl">

            <div className="flex items-center justify-between border-b p-5">

              <h2 className="text-xl font-bold">
                Thông tin Page
              </h2>

              <button
                onClick={() => setOpenSetting(false)}
              >
                <X />
              </button>

            </div>

            <div className="space-y-5 p-5">

              {/* Title */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Tiêu đề
                </label>

                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border p-3"
                />

              </div>

              {/* SEO */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  SEO
                </label>

                <input
                  value={form.seo}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      seo: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border p-3"
                />

              </div>

              {/* Slug */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Slug
                </label>

                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      slug: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border p-3"
                />

              </div>

              {/* Language */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Ngôn ngữ
                </label>

                <select
                  value={form.lang}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      lang: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border p-3"
                >
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </select>

              </div>

              {/* Translation Group */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Translation Group
                </label>

                <input
                  value={form.translationGroup}
                  readOnly
                  className="w-full rounded-lg border bg-slate-100 p-3 text-slate-500"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Hai trang có cùng Translation Group sẽ chuyển đổi qua lại bằng nút VI / EN.
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}