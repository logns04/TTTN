import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

export default function ThemeToggle() {
  const { dark, setDark } = useTheme();

  return (
    <button
      onClick={() => setDark(!dark)}
      className="hover:text-orange-600 transition"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}