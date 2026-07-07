import { useState } from "react";
import { ArrowLeft, Save, Settings, X } from "lucide-react";

import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";

import { config } from "../puck/config";

export default function Editor({ page, back, save }) {
  const [openSetting, setOpenSetting] = useState(false);

  const [form, setForm] = useState(
    page || {
      id: crypto.randomUUID(),
      title: "",
      seo: "",
      slug: "",
      lang: "vi",
      status: "Đã xuất bản",
      updated: "",
    },
  );

  const [data, setData] = useState(
    page?.data || {
      content: [],
      root: {
        props: {},
      },
    },
  );

  const publish = () => {
    save({
      ...form,
      data,
      updated: new Date().toLocaleDateString("vi-VN"),
    });
  };
  return (
    <div className="h-screen flex flex-col bg-slate-100">
      <div className="h-16 bg-white border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={back}
            className="border rounded-lg p-2 hover:bg-slate-100"
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
            className="border rounded-xl px-5 hover:bg-slate-100"
          >
            <Settings size={18} />
          </button>

          <button
            onClick={publish}
            className="bg-blue-600 text-white rounded-xl px-6 flex items-center gap-2"
          >
            <Save size={18} />
            Publish
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Puck config={config} data={data} onChange={setData} />
      </div>
      {openSetting && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenSetting(false)}
          />

          <div className="absolute left-0 top-0 h-full w-[340px] bg-white shadow-xl">
            <div className="border-b p-5 flex justify-between">
              <h2 className="font-bold text-xl">Thông tin Page</h2>

              <button onClick={() => setOpenSetting(false)}>
                <X />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <input
                placeholder="Tiêu đề"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                placeholder="SEO"
                value={form.seo}
                onChange={(e) =>
                  setForm({
                    ...form,
                    seo: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                placeholder="/slug"
                value={form.slug}
                onChange={(e) =>
                  setForm({
                    ...form,
                    slug: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

              <select
                value={form.lang}
                onChange={(e) =>
                  setForm({
                    ...form,
                    lang: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              >
                <option value="vi">Tiếng Việt</option>

                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
