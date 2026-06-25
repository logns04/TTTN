import React, { useState } from "react";
import useResponsive from "../../hooks/useResponsive";
import { getResponsiveValue }
from "../../utils/responsive";

function MenuItem({
  item = {},
  menuColor = "#ffffff",
  menuHoverColor = "#d4af37",
  menuFontSize = 16,
  menuFontWeight = 500,
  menuHoverScale = 1.05,
  menuTransition = 300,
}) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={item?.link || "#"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color: hover ? menuHoverColor : menuColor,
        fontSize: `${menuFontSize}px`,
        fontSize:
        getResponsiveValue(
          menuFontSize,
          menuFontSize * 0.85,
          menuFontSize * 0.7,
          window.innerWidth
           ),
        transform: hover
          ? `scale(${menuHoverScale})`
          : "scale(1)",
        transition: `all ${menuTransition}ms ease`,
        textDecoration: "none",
        display: "inline-block",
        cursor: "pointer",
      }}
    >
      {item?.label || "Menu"}
    </a>
  );
}

const Header = ({
  /* Header */
  backgroundColor = "#003DA5",
  headerHeight = 82,

  /* Logo */
  logo = "",
  logoWidth = 60,
  logoHeight = 60,
  logoX = 20,
  logoY = 10,
  logoBorderWidth = 0,
  logoBorderColor = "#ffffff",
  logoBorderRadius = 0,

  /* Title */
  clubName = "",
  titleColor = "#ffffff",
  titleFontSize = 20,
  titleFontWeight = 700,
  titleX = 100,
  titleY = 15,

  /* Menu */
  menuItems = [],
  menuColor = "#ffffff",
  menuHoverColor = "#d4af37",
  menuFontSize = 16,
  menuFontWeight = 500,
  menuGap = 40,
  menuX = 700,
  menuY = 30,
  menuHoverScale = 1.05,
  menuTransition = 300,

  /* Language */
  showLanguage = true,
  languageSize = 36,
  languageX = 1180,
  languageY = 20,
  languageBackground = "#d4af37",
  languageActiveColor = "#000000",
  languageTextColor = "#ffffff",
  languageBorderRadius = 50,
}) => {
  const {
  screenWidth,
  isMobile,
} = useResponsive();
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor,
      }}
    >
      <div
        className="relative mx-auto"
        style={{
          maxWidth: "1400px",
          height: `${headerHeight}px`,
        }}
      >
        {/* LOGO */}
        {logo && (
          <img
            src={logo}
            alt="Logo"
            className="absolute object-contain"
            style={{
              width: `${getResponsiveValue(
              logoWidth,
              logoWidth * 0.8,
              logoWidth * 0.6,
              screenWidth
            )}px`,

            height: `${getResponsiveValue(
              logoHeight,
              logoHeight * 0.8,
              logoHeight * 0.6,
              screenWidth
            )}px`,
              left: `${logoX}px`,
              top: `${logoY}px`,
              border: `${logoBorderWidth}px solid ${logoBorderColor}`,
              borderRadius: `${logoBorderRadius}px`,
            }}
          />
        )}

        {/* TITLE */}
        <div
          className="absolute whitespace-pre-line"
          style={{
            left: `${titleX}px`,
            top: `${titleY}px`,
            color: titleColor,
            fontSize: `${getResponsiveValue(
            titleFontSize,
            titleFontSize * 0.8,
            titleFontSize * 0.65,
            screenWidth
          )}px`,
            fontWeight: titleFontWeight,
            lineHeight: 1.4,
          }}
        >
          {clubName}
        </div>
{isMobile && (
  <button
    className="absolute text-white"
    style={{
      right: "20px",
      top: "20px",
      fontSize: "32px",
    }}
  >
    ☰
  </button>
)}
        {/* MENU */}
      {!isMobile && (  
        <ul
          className="absolute flex items-center"
          style={{
            left: `${menuX}px`,
            top: `${menuY}px`,
            gap: `${getResponsiveValue(
            menuGap,
            menuGap * 0.7,
            menuGap * 0.4,
            screenWidth
          )}px`,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >

          {Array.isArray(menuItems) &&
            menuItems.map((item, index) => (
              <li key={index}>
                <MenuItem
                  item={item}
                  menuColor={menuColor}
                  menuHoverColor={menuHoverColor}
                  menuFontSize={menuFontSize}
                  menuFontWeight={menuFontWeight}
                  menuHoverScale={menuHoverScale}
                  menuTransition={menuTransition}
                />
              </li>
            ))}
        </ul>
)}
        {/* LANGUAGE */}
        {showLanguage && (
          <div
            className="absolute flex overflow-hidden"
            style={{
              left: `${languageX}px`,
              top: `${languageY}px`,
              backgroundColor: languageBackground,
              borderRadius: `${languageBorderRadius}px`,
            }}
          >
            <button
              type="button"
              style={{
              width: `${getResponsiveValue(
                languageSize,
                languageSize * 0.8,
                languageSize * 0.65,
                screenWidth
              )}px`,

              height: `${getResponsiveValue(
                languageSize,
                languageSize * 0.8,
                languageSize * 0.65,
                screenWidth
              )}px`,
                backgroundColor: languageActiveColor,
                color: languageTextColor,
                border: "none",
                cursor: "pointer",
              }}
            >
              VN
            </button>

            <button
              type="button"
              style={{
                width: `${languageSize}px`,
                height: `${languageSize}px`,
                background: "transparent",
                color: languageTextColor,
                border: "none",
                cursor: "pointer",
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

export default Header;