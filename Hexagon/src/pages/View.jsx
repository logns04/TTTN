import { ArrowLeft } from "lucide-react";
import { Render } from "@puckeditor/core";
import "@puckeditor/core/puck.css";

import { config } from "../puck/config";

export default function View({ page, back }) {
  if (!page) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center border-b px-6 py-4">
        <button
          onClick={back}
          className="rounded-lg border px-4 py-2 hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <Render
        config={config}
        data={page.data}
      />
    </div>
  );
}