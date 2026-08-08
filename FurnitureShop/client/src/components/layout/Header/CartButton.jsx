import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  const count = 3;

  return (
    <button className="relative">
      <ShoppingCart
        className="hover:text-orange-600"
      />

      <span
        className="
        absolute
        -top-2
        -right-2
        w-5
        h-5
        rounded-full
        bg-red-500
        text-white
        text-xs
        flex
        items-center
        justify-center
      "
      >
        {count}
      </span>
    </button>
  );
}