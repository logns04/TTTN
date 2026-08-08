import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBox() {
  const [keyword, setKeyword] = useState("");

  return (
    <div
      className="
      relative
      w-72
    "
    >
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm sản phẩm..."
        className="
        w-full
        border
        rounded-full
        px-5
        py-2
        pr-12
        outline-none
        focus:border-orange-500
      "
      />

      <Search
        className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-gray-500
      "
      size={18}
      />
    </div>
  );
}