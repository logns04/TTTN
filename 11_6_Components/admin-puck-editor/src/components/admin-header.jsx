import React from "react";

const AdminHeader = (props) => {

  const logo = props.logo ?? props.puck?.render?.logo;

  const clubName =
    props.clubName ??
    props.puck?.render?.clubName;

  const clubNameColor =
    props.clubNameColor ??
    props.puck?.render?.clubNameColor;

  const clubNameSize =
    props.clubNameSize ??
    props.puck?.render?.clubNameSize;

  const backgroundColor =
    props.backgroundColor ??
    props.puck?.render?.backgroundColor;

  const menuColor =
    props.menuColor ??
    props.puck?.render?.menuColor;

  const menuHoverColor =
    props.menuHoverColor ??
    props.puck?.render?.menuHoverColor;

  const menuFontSize =
    props.menuFontSize ??
    props.puck?.render?.menuFontSize;

  const menuGap =
    props.menuGap ??
    props.puck?.render?.menuGap;

  const logoGap =
    props.logoGap ??
    props.puck?.render?.logoGap;

  const menus =
    props.menus ??
    props.puck?.render?.menus;

  const logoBorderWidth =
    props.logoBorderWidth ??
    props.puck?.render?.logoBorderWidth;

  const logoBorderColor =
    props.logoBorderColor ??
    props.puck?.render?.logoBorderColor;

  const logoBorderRadius =
    props.logoBorderRadius ??
    props.puck?.render?.logoBorderRadius;

  return (
    <header
      className="w-full"
      style={{
        backgroundColor,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[110px] flex items-center justify-between">

        <div
          className="flex items-center"
          style={{
            gap: `${logoGap}px`,
          }}
        >
          <img
            src={logo?.imageUrl}
            alt=""
            style={{
              width: `${logo?.width}px`,
              height: `${logo?.height}px`,
              border: `${logoBorderWidth}px solid ${logoBorderColor}`,
              borderRadius: `${logoBorderRadius}px`,
            }}
          />

          <div
            className="font-bold whitespace-pre-line"
            style={{
              color: clubNameColor,
              fontSize: `${clubNameSize}px`,
            }}
          >
            {clubName}
          </div>
        </div>

        <nav>
          <ul
            className="flex items-center"
            style={{
              gap: `${menuGap}px`,
            }}
          >
            {menus?.map((item, index) => (
              <li key={index}>
                <a
                  href={item.url}
                  style={{
                    color: menuColor,
                    fontSize: `${menuFontSize}px`,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color =
                      menuHoverColor;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color =
                      menuColor;
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-full bg-yellow-500 text-white">
            VN
          </button>

          <button className="px-3 py-1 rounded-full bg-white">
            EN
          </button>
        </div>

      </div>
    </header>
  );
};

export default AdminHeader;