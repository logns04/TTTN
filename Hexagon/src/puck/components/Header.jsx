export default function Header({
  logo,
  logoWidth = 56,
  logoHeight = 56,
  logoText = "HEXAGON",
  logoLink = "/",

  backgroundColor = "#257447",
  textColor = "#ffffff",
  hoverColor = "#d1fae5",

  headerHeight = 88,
  containerWidth = "1400px",
  paddingX = 32,

  sticky = false,
  shadow = true,
  borderBottom = false,

  menu = [],

  menuFontSize = 18,
  menuFontWeight = 500,
  menuGap = 40,

  showLanguage = true,

  showButton = false,
  buttonText = "Liên hệ",
  buttonLink = "#",
  buttonColor = "#ffffff",
  buttonTextColor = "#257447",
}) {
  return (
    <header
      style={{
        background: backgroundColor,
        height: headerHeight,
        position: sticky ? "sticky" : "relative",
        top: sticky ? 0 : "auto",
        zIndex: 1000,
        borderBottom: borderBottom ? "1px solid rgba(255,255,255,.15)" : "none",
        boxShadow: shadow ? "0 2px 10px rgba(0,0,0,.08)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: containerWidth === "full" ? "100%" : containerWidth,
          paddingLeft: paddingX,
          paddingRight: paddingX,
        }}
        className="mx-auto flex h-full items-center justify-between"
      >
        {/* Logo */}

        <a
          href={logoLink}
          className="flex items-center gap-4"
        >
          {logo && (
            <img
              src={logo}
              alt={logoText}
              style={{
                width: logoWidth,
                height: logoHeight,
              }}
              className="object-contain"
            />
          )}

          <span
            style={{
              color: textColor,
            }}
            className="text-4xl font-bold"
          >
            {logoText}
          </span>
        </a>

        {/* Right */}

        <div className="flex items-center">

          {/* Menu */}

          <nav
            style={{
              gap: menuGap,
            }}
            className="flex items-center"
          >
            {menu.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target={item.newTab ? "_blank" : "_self"}
                rel="noreferrer"
                style={{
                  color: textColor,
                  fontSize: menuFontSize,
                  fontWeight: menuFontWeight,
                }}
                className="transition-colors duration-200 hover:opacity-80"
                onMouseEnter={(e) => {
                  e.target.style.color = hoverColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = textColor;
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}

          {showButton && (
            <a
              href={buttonLink}
              className="ml-8 rounded-xl px-6 py-3 transition-opacity hover:opacity-90"
              style={{
                background: buttonColor,
                color: buttonTextColor,
              }}
            >
              {buttonText}
            </a>
          )}

          {/* Language */}

          {showLanguage && (
            <div className="ml-8 flex items-center gap-3 text-2xl">
              <button className="hover:scale-110 transition">
                VN
              </button>

              <button className="hover:scale-110 transition">
                EN
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}