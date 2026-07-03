import React, { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaBars, FaTimes } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

const iconMap = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
};

const Header = ({
  header = {},
  logo = {},
  menu = {},
  menus = [],
  social = {},
  socials = [],
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    height = 100,
    maxWidth = 1400,
    background = "#fff",

    paddingTop = 0,
    paddingBottom = 0,
    paddingLeft = 40,
    paddingRight = 40,

    sticky = false,
    shadow = false,
    borderBottom = true,

    logoWidth = 240,
    socialWidth = 180,
  } = header;

  const {
    image = "",
    link = "/",

    width = 220,
    height: logoHeight = 70,

    positionX = 0,
    positionY = 0,

    borderWidth = 0,
    borderColor = "#ddd",
    borderRadius = 0,
  } = logo;

  const {
    fontSize = 16,
    fontWeight = 600,

    color = "#333",
    hoverColor = "#F28C28",
    activeColor = "#F28C28",

    gap = 35,

    uppercase = true,

    letterSpacing = 0,

    positionX: menuX = 0,
    positionY: menuY = 0,
  } = menu;
  const {
    gap: socialGap = 12,
    positionX: socialX = 0,
    positionY: socialY = 0,
  } = social;
  const menuEnter = (e) => {
    e.currentTarget.style.color = hoverColor;
  };
  const menuLeave = (e, active) => {
    e.currentTarget.style.color = active ? activeColor : color;
  };
  return (
    <>
      <header
        style={{
          width: "100%",

          height,

          background,

          position: sticky ? "sticky" : "relative",

          top: 0,

          zIndex: 999,

          borderBottom: borderBottom ? "1px solid #ececec" : "none",

          boxShadow: shadow ? "0 3px 12px rgba(0,0,0,.08)" : "none",
        }}
      >
        <div
          style={{
            maxWidth,

            height: "100%",

            margin: "0 auto",

            padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,

            display: "grid",

            gridTemplateColumns: `${logoWidth}px 1fr ${socialWidth}px`,

            alignItems: "center",
          }}
        >
          {/* ================= Logo ================= */}

          <div
            style={{
              display: "flex",

              alignItems: "center",

              justify: "flex-start",

              transform: `translate(${positionX}px,${positionY}px)`,
            }}
          >
            <a href={link}>
              <img
                src={image}

                alt="logo"

                style={{
                  width,

                  height: logoHeight,

                  objectFit: "contain",

                  border: `${borderWidth}px solid ${borderColor}`,

                  borderRadius,
                }}
              />
            </a>
          </div>

          {}

          <nav
            style={{
              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              gap,

              transform: `translate(${menuX}px,${menuY}px)`,
            }}
          >
            {menus.map((item, index) => (
              <a
                key={index}

                href={item.url}

                style={{
                  textDecoration: "none",

                  color: item.active ? activeColor : color,

                  fontSize,

                  fontWeight,

                  letterSpacing,

                  textTransform: uppercase ? "uppercase" : "none",

                  transition: ".3s",
                }}

                onMouseEnter={menuEnter}

                onMouseLeave={(e) => menuLeave(e, item.active)}
              >
                {item.title}
              </a>
            ))}
          </nav>
          {}

          <div
            style={{
              display: "flex",

              justifyContent: "flex-end",

              alignItems: "center",

              gap: socialGap,

              transform: `translate(${socialX}px,${socialY}px)`,
            }}
          >
            {socials.map((item, index) => {
              const Icon = iconMap[item.icon];

              if (!Icon) return null;

              return (
                <a
                  key={index}

                  href={item.url}

                  target="_blank"

                  rel="noreferrer"

                  style={{
                    width: item.size ?? 40,

                    height: item.size ?? 40,

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",

                    background: item.background ?? "#eee",

                    color: item.color ?? "#fff",

                    border: `${item.borderWidth ?? 0}px solid ${item.borderColor ?? "#ddd"}`,

                    borderRadius: item.radius ?? "50%",

                    textDecoration: "none",

                    transition: ".3s",

                    transform: `translate(${item.positionX ?? 0}px,${item.positionY ?? 0}px) scale(${item.scale ?? 1})`,
                  }}

                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      item.hoverBackground ?? item.background;

                    e.currentTarget.style.color = item.hoverColor ?? item.color;

                    e.currentTarget.style.transform = `translate(${item.positionX ?? 0}px,${item.positionY ?? 0}px) scale(${item.hoverScale ?? 1.1})`;
                  }}

                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      item.background ?? "#eee";

                    e.currentTarget.style.color = item.color ?? "#fff";

                    e.currentTarget.style.transform = `translate(${item.positionX ?? 0}px,${item.positionY ?? 0}px) scale(${item.scale ?? 1})`;
                  }}
                >
                  <Icon size={item.iconSize ?? 18} />
                </a>
              );
            })}
          </div>
        </div>

        {}

        <button
          onClick={() => setMobileOpen(true)}

          style={{
            display: "none",

            position: "absolute",

            right: 20,

            top: "50%",

            transform: "translateY(-50%)",

            background: "transparent",

            border: 0,

            cursor: "pointer",
          }}
        >
          <FaBars size={24} />
        </button>
      </header>

      {}

      {mobileOpen && (
        <>
          <div
            onClick={() => setMobileOpen(false)}

            style={{
              position: "fixed",

              inset: 0,

              background: "rgba(0,0,0,.4)",

              zIndex: 9998,
            }}
          />

          <div
            style={{
              position: "fixed",

              top: 0,

              right: 0,

              width: 320,

              height: "100vh",

              background: "#fff",

              zIndex: 9999,

              display: "flex",

              flexDirection: "column",

              boxShadow: "-5px 0 15px rgba(0,0,0,.1)",
            }}
          >
            <div
              style={{
                height: 70,

                display: "flex",

                alignItems: "center",

                justifyContent: "space-between",

                padding: "0 20px",

                borderBottom: "1px solid #eee",
              }}
            >
              <strong>MENU</strong>

              <FaTimes
                size={22}

                style={{ cursor: "pointer" }}

                onClick={() => setMobileOpen(false)}
              />
            </div>

            {}
            <div
              style={{
                flex: 1,

                padding: 20,

                overflowY: "auto",
              }}
            >
              {menus.map((item, index) => (
                <a
                  key={index}

                  href={item.url}

                  onClick={() => setMobileOpen(false)}

                  style={{
                    display: "block",

                    padding: "14px 0",

                    textDecoration: "none",

                    color: item.active ? activeColor : color,

                    fontSize,

                    fontWeight,

                    letterSpacing,

                    textTransform: uppercase ? "uppercase" : "none",

                    borderBottom: "1px solid #f3f3f3",

                    transition: ".3s",
                  }}

                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = hoverColor)
                  }

                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = item.active
                      ? activeColor
                      : color)
                  }
                >
                  {item.title}
                </a>
              ))}
            </div>

            {}

            <div
              style={{
                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                gap: socialGap,

                padding: 20,

                borderTop: "1px solid #eee",
              }}
            >
              {socials.map((item, index) => {
                const Icon = iconMap[item.icon];

                if (!Icon) return null;

                return (
                  <a
                    key={index}

                    href={item.url}

                    target="_blank"

                    rel="noreferrer"

                    style={{
                      width: item.size ?? 40,

                      height: item.size ?? 40,

                      display: "flex",

                      justifyContent: "center",

                      alignItems: "center",

                      background: item.background ?? "#eee",

                      color: item.color ?? "#fff",

                      border: `${item.borderWidth ?? 0}px solid ${item.borderColor ?? "#ddd"}`,

                      borderRadius: item.radius ?? "50%",

                      textDecoration: "none",

                      transition: ".3s",
                    }}

                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        item.hoverBackground ?? item.background;

                      e.currentTarget.style.color =
                        item.hoverColor ?? item.color;
                    }}

                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        item.background ?? "#eee";

                      e.currentTarget.style.color = item.color ?? "#fff";
                    }}
                  >
                    <Icon size={item.iconSize ?? 18} />
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
