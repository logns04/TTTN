import { useState } from "react";

export default function HeaderLanguage({ page, pages, onChange }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          const vi = pages.find(
            (p) =>
              p.translationGroup === page.translationGroup && p.lang === "vi",
          );

          if (vi) onChange(vi);
        }}
      >
        🇻🇳
      </button>

      <button
        onClick={() => {
          const en = pages.find(
            (p) =>
              p.translationGroup === page.translationGroup && p.lang === "en",
          );

          if (en) onChange(en);
        }}
      >
        🇺🇸
      </button>
    </div>
  );
}
