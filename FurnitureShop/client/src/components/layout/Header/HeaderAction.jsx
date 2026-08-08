import {
  Heart,
  User
} from "lucide-react";
import SearchBox from "./SearchBox";
import CartButton from "./CartButton";
import ThemeToggle from "./ThemeToggle";
export default function HeaderAction() {
  return (
    <div className="flex items-center gap-5">
      <SearchBox />
      <ThemeToggle />
      <Heart
        className="
        cursor-pointer
        hover:text-orange-600
      "
      />
      <CartButton />
      <User
        className="
        cursor-pointer
        hover:text-orange-600
      "
      />
    </div>
  );
}