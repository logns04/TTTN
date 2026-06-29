import React, { useState } from "react";

const AdminHeader = (props) => {

  /* ===============================
      HEADER
  ================================ */

  const sticky =
    props.sticky ??
    props.puck?.render?.sticky ??
    true;

  const top =
    props.top ??
    props.puck?.render?.top ??
    0;

  const zIndex =
    props.zIndex ??
    props.puck?.render?.zIndex ??
    999;

  const headerHeight =
    props.headerHeight ??
    props.puck?.render?.headerHeight ??
    90;

  const containerWidth =
    props.containerWidth ??
    props.puck?.render?.containerWidth ??
    1500;

  const paddingX =
    props.paddingX ??
    props.puck?.render?.paddingX ??
    30;

  const headerJustify =
    props.headerJustify ??
    props.puck?.render?.headerJustify ??
    "space-between";



  /* ===============================
      BACKGROUND
  ================================ */

  const backgroundType =
    props.backgroundType ??
    props.puck?.render?.backgroundType ??
    "color";

  const backgroundColor =
    props.backgroundColor ??
    props.puck?.render?.backgroundColor ??
    "#0d47a1";

  const backgroundGradient =
    props.backgroundGradient ??
    props.puck?.render?.backgroundGradient ??
    "linear-gradient(90deg,#003da5,#0f4cc9)";

  const backgroundImage =
    props.backgroundImage ??
    props.puck?.render?.backgroundImage ??
    "";

  const backgroundSize =
    props.backgroundSize ??
    props.puck?.render?.backgroundSize ??
    "cover";

  const backgroundPosition =
    props.backgroundPosition ??
    props.puck?.render?.backgroundPosition ??
    "center";



  /* ===============================
      OVERLAY
  ================================ */

  const overlayEnable =
    props.overlayEnable ??
    props.puck?.render?.overlayEnable ??
    false;

  const overlayColor =
    props.overlayColor ??
    props.puck?.render?.overlayColor ??
    "rgba(0,0,0,.25)";



  /* ===============================
      LOGO
  ================================ */

  const logo =
    props.logo ??
    props.puck?.render?.logo ??
    {};

  const logoGap =
    props.logoGap ??
    props.puck?.render?.logoGap ??
    18;

  const logoPositionX =
    logo.positionX ?? 0;

  const logoPositionY =
    logo.positionY ?? 0;

  const logoWidth =
    logo.width ?? 70;

  const logoHeight =
    logo.height ?? 70;

  const logoBorderWidth =
    logo.borderWidth ?? 0;

  const logoBorderColor =
    logo.borderColor ?? "#fff";

  const logoBorderRadius =
    logo.borderRadius ?? 999;

  const logoShadow =
    logo.shadow ?? "none";



  /* ===============================
      TITLE
  ================================ */

  const clubName =
    props.clubName ??
    props.puck?.render?.clubName ??
    "";

  const clubNameColor =
    props.clubNameColor ??
    props.puck?.render?.clubNameColor ??
    "#ffffff";

  const clubNameSize =
    props.clubNameSize ??
    props.puck?.render?.clubNameSize ??
    18;

  const clubNameWeight =
    props.clubNameWeight ??
    props.puck?.render?.clubNameWeight ??
    700;

  const titleX =
    props.titleX ??
    props.puck?.render?.titleX ??
    0;

  const titleY =
    props.titleY ??
    props.puck?.render?.titleY ??
    0;

  const titleWidth =
    props.titleWidth ??
    props.puck?.render?.titleWidth ??
    330;

  const lineHeight =
    props.lineHeight ??
    props.puck?.render?.lineHeight ??
    1.4;

  const letterSpacing =
    props.letterSpacing ??
    props.puck?.render?.letterSpacing ??
    0;



  /* ===============================
      MENU
  ================================ */

  const menus =
    props.menus ??
    props.puck?.render?.menus ??
    [];

  const menuColor =
    props.menuColor ??
    props.puck?.render?.menuColor ??
    "#ffffff";

  const menuHoverColor =
    props.menuHoverColor ??
    props.puck?.render?.menuHoverColor ??
    "#ffd84d";

  const menuFontSize =
    props.menuFontSize ??
    props.puck?.render?.menuFontSize ??
    16;

  const menuFontWeight =
    props.menuFontWeight ??
    props.puck?.render?.menuFontWeight ??
    600;

  const menuGap =
    props.menuGap ??
    props.puck?.render?.menuGap ??
    36;

  const menuPositionX =
    props.menuPositionX ??
    props.puck?.render?.menuPositionX ??
    0;

  const menuPositionY =
    props.menuPositionY ??
    props.puck?.render?.menuPositionY ??
    0;



  /* ===============================
      LANGUAGE
  ================================ */

  const showLanguage =
    props.showLanguage ??
    props.puck?.render?.showLanguage ??
    true;

  const [language, setLanguage] =
    useState("VN");
      /* ===============================
      BACKGROUND STYLE
  ================================ */

  const headerStyle = {
    position: sticky ? "sticky" : "relative",
    top,
    zIndex,
    width: "100%",
    overflow: "hidden"
  };

  if (backgroundType === "color") {
    headerStyle.background = backgroundColor;
  }

  if (backgroundType === "gradient") {
    headerStyle.background = backgroundGradient;
  }

  if (backgroundType === "image") {
    headerStyle.backgroundImage = `url(${backgroundImage})`;
    headerStyle.backgroundSize = backgroundSize;
    headerStyle.backgroundPosition = backgroundPosition;
    headerStyle.backgroundRepeat = "no-repeat";
  }



  /* ===============================
      MENU HOVER
  ================================ */

  const menuEnter = (e) => {
    e.currentTarget.style.color = menuHoverColor;
    e.currentTarget.style.transform = "translateY(-2px)";
  };

  const menuLeave = (e) => {
    e.currentTarget.style.color = menuColor;
    e.currentTarget.style.transform = "translateY(0)";
  };



  return (

    <header style={headerStyle}>

      {/* Overlay */}

      {overlayEnable && (

        <div

          style={{

            position: "absolute",

            inset: 0,

            background: overlayColor,

            zIndex: 1

          }}

        />

      )}



      {/* Container */}

      <div

        style={{

          position: "relative",

          zIndex: 2,

          maxWidth: containerWidth,

          margin: "0 auto",

          height: headerHeight,

          display: "flex",

          alignItems: "center",

          justifyContent: headerJustify,

          paddingLeft: paddingX,

          paddingRight: paddingX

        }}

      >




        {/* ===============================
              LOGO + TITLE
        ================================ */}

        <div

          style={{

            display: "flex",

            alignItems: "center",

            gap: logoGap,

            flexShrink: 0

          }}

        >

          <img

            src={logo.imageUrl}

            alt="logo"

            style={{

              width: logoWidth,

              height: logoHeight,

              objectFit: "contain",

              border:

                logoBorderWidth > 0

                  ? `${logoBorderWidth}px solid ${logoBorderColor}`

                  : "none",

              borderRadius: logoBorderRadius,

              boxShadow: logoShadow,

              transform:

                `translate(${logoPositionX}px,${logoPositionY}px)`

            }}

          />



          <div

            style={{

              width: titleWidth,

              color: clubNameColor,

              fontSize: clubNameSize,

              fontWeight: clubNameWeight,

              lineHeight,

              letterSpacing,

              whiteSpace: "pre-line",

              transform:

                `translate(${titleX}px,${titleY}px)`

            }}

          >

            {clubName}

          </div>

        </div>
        {/* ===============================
              MENU
        ================================ */}

        <nav
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            transform: `translate(${menuPositionX}px,${menuPositionY}px)`
          }}
        >
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: menuGap,
              margin: 0,
              padding: 0,
              listStyle: "none"
            }}
          >
            {menus.map((item, index) => (
              <li key={index}>
                <a
                  href={item.url}
                  style={{
                    color: menuColor,
                    fontSize: menuFontSize,
                    fontWeight: menuFontWeight,
                    textDecoration: "none",
                    transition: ".25s ease",
                    cursor: "pointer",
                    display: "inline-block"
                  }}
                  onMouseEnter={menuEnter}
                  onMouseLeave={menuLeave}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ===============================
              LANGUAGE
        ================================ */}

        {showLanguage && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: 72,
              height: 34,
              borderRadius: 999,
              overflow: "hidden",
              background: "#F4B400",
              flexShrink: 0
            }}
          >
            <button
              onClick={() => setLanguage("VN")}
              style={{
                flex: 1,
                height: "100%",
                border: 0,
                cursor: "pointer",
                fontWeight: 600,
                transition: ".25s",
                background:
                  language === "VN"
                    ? "#725100"
                    : "transparent",
                color:
                  language === "VN"
                    ? "#ffffff"
                    : "#222"
              }}
            >
              VN
            </button>

            <button
              onClick={() => setLanguage("EN")}
              style={{
                flex: 1,
                height: "100%",
                border: 0,
                cursor: "pointer",
                fontWeight: 600,
                transition: ".25s",
                background:
                  language === "EN"
                    ? "#725100"
                    : "transparent",
                color:
                  language === "EN"
                    ? "#ffffff"
                    : "#222"
              }}
            >
              EN
            </button>
          </div>
        )}

      </div>

    </header>

  );

};

export default AdminHeader;