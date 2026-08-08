import MegaMenu from "./MegaMenu";

export default function NavItem({ item }) {
  return (
    <li className="relative group py-8">

      <button
        className="
        font-medium
        hover:text-orange-600
        duration-300
      "
      >
        {item.title}
      </button>

      {item.children && <MegaMenu data={item.children} />}

    </li>
  );
}