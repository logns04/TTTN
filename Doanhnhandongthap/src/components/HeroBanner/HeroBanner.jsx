import React from "react";
import SectionTransition from "../common/SectionTransition";
const HeroBanner = ({
  height = 760,

  backgroundType = "gradient",
  backgroundColor = "#0d6efd",

  gradientFrom = "#0d6efd",
  gradientTo = "#6ec6ff",

  backgroundImage = "",

  overlayEnable = true,
  overlayFrom = "rgba(0,61,165,0.85)",
  overlayTo = "rgba(0,61,165,0.25)",
  overlayDirection = "135deg",
  overlayOpacity = 100,

blocks = [],

showTransition = true,

transitionHeight = 150,

transitionColorFrom =
  "rgba(255,255,255,0)",

transitionColorTo =
  "rgba(255,255,255,1)",

transitionBlur = 0,

transitionDirection =
  "to bottom",

}) => {
  const getBackgroundStyle = () => {
    if (
      backgroundType === "image" &&
      backgroundImage
    ) {
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }

    if (backgroundType === "gradient") {
      return {
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      };
    }

    return {
      backgroundColor,
    };
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: `${height}px`,
        ...getBackgroundStyle(),
      }}
    >
          {/* OVERLAY */}
    {overlayEnable && (
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(
            ${overlayDirection},
            ${overlayFrom},
            ${overlayTo}
          )`,
          opacity: overlayOpacity / 100,
        }}
      />
    )}
      <div className="relative z-[2]">
       {blocks.map((block, index) => (
        <div
          key={index}
          className="absolute backdrop-blur-md"
          style={{
            left: `${block.x || 80}px`,
            top: `${block.y || 180}px`,

            width: `${block.width || 600}px`,
            height: `${block.height || 400}px`,

            background:
              block.background ||
              "rgba(255,255,255,.18)",

            border:
              `${block.borderWidth || 1}px solid ${
                block.borderColor ||
                "rgba(255,255,255,.25)"
              }`,

            borderTopLeftRadius:
              `${block.radiusTL || 60}px`,

            borderTopRightRadius:
              `${block.radiusTR || 60}px`,

            borderBottomLeftRadius:
              `${block.radiusBL || 60}px`,

            borderBottomRightRadius:
              `${block.radiusBR || 20}px`,

            boxShadow:
              block.shadow ||
              "0 25px 50px rgba(0,0,0,.2)",

            padding: "40px",
          }}
        >
          {/* SUB TITLE */}
<div
  contentEditable
  suppressContentEditableWarning
  style={{
    color: block.subTitleColor,
    fontSize: `${block.subTitleSize}px`,
    outline: "none",
    cursor: "text",
  }}
>
  {block.subTitle}
</div>

          {/* TITLE */}
<div
  contentEditable
  suppressContentEditableWarning
  style={{
    color: block.titleColor,
    fontSize: `${block.titleSize}px`,
    fontWeight: 800,
    lineHeight: 1.1,
    outline: "none",
    cursor: "text",
  }}
>
  {block.title}
</div>

          {/* DESCRIPTION */}
<div
  contentEditable
  suppressContentEditableWarning
  style={{
    color: block.descriptionColor,
    fontSize: `${block.descriptionSize}px`,
    lineHeight: 1.8,
    outline: "none",
    cursor: "text",
  }}
>
  {block.description}
</div>

          {/* BUTTONS */}
<div
  className="relative mt-10"
  style={{
    width: "100%",
    minHeight: "120px",
  }}
>
  {(block.buttons || []).map(
    (button, btnIndex) => (
      <a
        key={btnIndex}
        href={button.link || "#"}
        target="_self"
        rel="noreferrer"
        style={{
          position: "absolute",

          left: `${button.x ?? 0}px`,
          top: `${button.y ?? 0}px`,

          width: `${button.width ?? 220}px`,
          height: `${button.height ?? 55}px`,

          background:
            button.background ??
            "#0d6efd",

          color:
            button.color ??
            "#ffffff",

          fontSize:
            `${button.fontSize ?? 16}px`,

          fontWeight:
            button.fontWeight ?? 700,

          textDecoration: "none",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          border:
            `${button.borderWidth ?? 0}px solid ${
              button.borderColor ??
              "transparent"
            }`,

          borderTopLeftRadius:
            `${button.radiusTL ?? 20}px`,

          borderTopRightRadius:
            `${button.radiusTR ?? 20}px`,

          borderBottomLeftRadius:
            `${button.radiusBL ?? 20}px`,

          borderBottomRightRadius:
            `${button.radiusBR ?? 0}px`,

          boxShadow:
            button.shadow ??
            "0 10px 25px rgba(0,0,0,.15)",

          transition:
            "all .3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            `scale(${button.hoverScale ?? 1.05})`;

          if (button.hoverBackground) {
            e.currentTarget.style.backgroundColor =
              button.hoverBackground;
          }

          if (button.hoverColor) {
            e.currentTarget.style.color =
              button.hoverColor;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "scale(1)";

          e.currentTarget.style.backgroundColor =
            button.background ??
            "#0d6efd";

          e.currentTarget.style.color =
            button.color ??
            "#ffffff";
        }}
      >
        {button.text}
      </a>
    )
  )}
</div>
        </div>
            ))}
</div>
    <SectionTransition
  show={showTransition}
  height={transitionHeight}
  colorFrom={transitionColorFrom}
  colorTo={transitionColorTo}
  blur={transitionBlur}
  direction={transitionDirection}
/>
    </section>
  );
};

export default HeroBanner;