import React from "react";

const AdminSenHong = (props) => {

  const sectionHeight = props.sectionHeight ?? props.puck?.render?.sectionHeight ?? 700;

  const topText = props.topText ?? props.puck?.render?.topText;
  const title = props.title ?? props.puck?.render?.title;
  const titleColor = props.titleColor ?? props.puck?.render?.titleColor;
  const titleSize = props.titleSize ?? props.puck?.render?.titleSize;

  const subtitle = props.subtitle ?? props.puck?.render?.subtitle;
  const subtitleColor = props.subtitleColor ?? props.puck?.render?.subtitleColor;
  const subtitleSize = props.subtitleSize ?? props.puck?.render?.subtitleSize;

  const buttons = props.buttons ?? props.puck?.render?.buttons;
  const background = props.background ?? props.puck?.render?.background;
  const layout = props.layout ?? props.puck?.render?.layout;
  const cardStyle = props.cardStyle ?? props.puck?.render?.cardStyle;

  const alignFlex =
    layout?.align === "left"
      ? "justify-start"
      : layout?.align === "right"
      ? "justify-end"
      : "justify-center";

  const alignItems =
    layout?.align === "left"
      ? "items-start"
      : layout?.align === "right"
      ? "items-end"
      : "items-center";

  const getBackgroundStyle = () => {
    const bg = background || {};

    if (bg.type === "gradient") {
      return {
        background: `linear-gradient(${bg.gradientDirection || "to bottom right"}, ${bg.gradientFrom || "#667eea"}, ${bg.gradientTo || "#764ba2"})`
      };
    }

    if ((bg.type === "image" || bg.type === "gif") && bg.imageUrl) {
      return {
        backgroundImage: `url('${bg.imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }

    return {
      backgroundColor: bg.color || "#1e3a8a"
    };
  };

  const titleSizeMap = {
    sm: "text-2xl",
    base: "text-4xl",
    lg: "text-5xl",
    xl: "text-6xl",
    "2xl": "text-7xl"
  };

  const subtitleSizeMap = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  };

  const cardBorderRadiusStyle = {
    borderTopLeftRadius: `${cardStyle?.topLeftRadius ?? 40}px`,
    borderTopRightRadius: `${cardStyle?.topRightRadius ?? 120}px`,
    borderBottomRightRadius: `${cardStyle?.bottomRightRadius ?? 40}px`,
    borderBottomLeftRadius: `${cardStyle?.bottomLeftRadius ?? 120}px`
  };
  const hexToRgba = (hex, opacity) => {
  if (!hex.startsWith("#")) return hex;

  let c = hex.replace("#", "");

  if (c.length === 3) {
    c = c.split("").map(x => x + x).join("");
  }

  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
  return (
    <section
      className="relative w-full px-6 flex items-center transition-all duration-300 overflow-hidden"
      style={{
        ...getBackgroundStyle(),
        minHeight: `${sectionHeight}px`
      }}
    >

      {background?.overlayEnable && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
  ${background.overlayDirection || "to right"},${hexToRgba(background.overlayFrom || "#000000", (background.overlayOpacity ?? 45) / 100)},${hexToRgba(background.overlayTo || "#000000", (background.overlayOpacity ?? 45) / 100)})`
          }}
        />
      )}

      <div className={`relative z-10 mx-auto w-full max-w-7xl flex ${alignFlex} ${alignItems}`}>

        <div
          className="backdrop-blur-md border border-white/20 max-w-xl w-full shadow-2xl transition-all duration-300"
          style={{
            ...cardBorderRadiusStyle,
            background: "rgba(255,255,255,.10)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            padding: "50px",
            textAlign: layout?.align || "left"
          }}
        >

          {topText && (
            <p
              className="uppercase mb-3"
              style={{
                color: "rgba(255,255,255,.8)",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 4
              }}
            >
              {topText}
            </p>
          )}

          {title && (
            <h1
              className={`${titleSizeMap[titleSize] || "text-6xl"} font-bold mb-5`}
              style={{
                color: titleColor,
                lineHeight: 1.05
              }}
            >
              {title}
            </h1>
          )}

          {subtitle && (
            <p
              className={`${subtitleSizeMap[subtitleSize] || "text-base"} whitespace-pre-line mb-8`}
              style={{
                color: subtitleColor,
                lineHeight: 1.9,
                textAlign: "justify"
              }}
            >
              {subtitle}
            </p>
          )}

          {buttons && buttons.length > 0 && (
            <div className={`flex flex-wrap gap-4 ${alignFlex}`}>
              {buttons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.url || "#"}
                  className="inline-flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    padding: "14px 32px",
                    backgroundColor: btn.bgColor || "#2563eb",
                    color: btn.textColor || "#fff",
                    borderRadius: `${btn.borderRadius ?? 999}px`,
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 8px 20px rgba(0,0,0,.25)"
                  }}
                >
                  {btn.text}
                </a>
              ))}
            </div>
          )}

        </div>

      </div>

    </section>
  );

};

export default AdminSenHong;