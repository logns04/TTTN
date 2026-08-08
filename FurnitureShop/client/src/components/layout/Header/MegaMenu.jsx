export default function MegaMenu({ data }) {
  return (
    <div
      className="
      absolute
      left-0
      top-full
      mt-4
      w-[850px]
      rounded-xl
      bg-white
      shadow-2xl
      border
      opacity-0
      invisible
      group-hover:visible
      group-hover:opacity-100
      duration-300
      p-8
      z-50
    "
    >
      <div className="grid grid-cols-3 gap-10">
        {data.map((group) => (
          <div key={group.title}>
            <h3 className="font-bold text-lg mb-4 text-orange-600">
              {group.title}
            </h3>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="
                    cursor-pointer
                    text-gray-600
                    hover:text-orange-600
                    duration-300
                  "
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}