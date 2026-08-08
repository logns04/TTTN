import Logo from "./Logo";
import NavItem from "./NavItem";
import HeaderAction from "./HeaderAction";

import { menuData } from "./menuData";

import useStickyHeader from "../../../hooks/useStickyHeader";

export default function Navbar() {

  const sticky = useStickyHeader();

  return (

    <nav
      className={`
        bg-white
        dark:bg-zinc-900
        duration-300
        z-50
        w-full

        ${
          sticky
            ? "fixed top-0 shadow-lg animate-slideDown"
            : "relative"
        }
      `}
    >

      <div
        className="
        max-w-7xl
        mx-auto
        h-20
        px-4

        flex
        items-center
        justify-between
      "

      >

        <Logo />

        <ul className="hidden lg:flex gap-8">

          {menuData.map(item => (
            <NavItem
              key={item.title}
              item={item}
            />
          ))}

        </ul>

        <HeaderAction />

      </div>

    </nav>

  );
}