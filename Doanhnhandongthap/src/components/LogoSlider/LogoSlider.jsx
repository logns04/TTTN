import React from "react";
import SectionTransition
from "../common/SectionTransition";
const LogoSlider = ({
  // =========================
  // SECTION
  // =========================
  sectionHeight = 280,

  backgroundType = "color",
  backgroundColor = "#ffffff",

  gradientFrom = "#003DA5",
  gradientTo = "#0D6EFD",

  backgroundImage = "",

  overlayEnable = false,
  overlayFrom = "rgba(0,61,165,.8)",
  overlayTo = "rgba(0,61,165,.2)",
  overlayDirection = "90deg",
  overlayOpacity = 100,

  // =========================
  // TITLE
  // =========================
  title = "Đối Tác Đồng Hành",

  titleColor = "#003DA5",
  titleSize = 36,
  titleWeight = 700,

  titleX = 0,
  titleY = 0,

  // =========================
  // LOGOS
  // =========================
  cardWidth = 180,
cardHeight = 110,

cardBackground = "#ffffff",

cardRadius = 20,

cardBorderWidth = 0,
cardBorderColor = "#e5e7eb",

cardPadding = 20,

cardShadow =
  "0 10px 30px rgba(0,0,0,.08)",
  rows = 1,
  rowGap = 30,

  logos = [],

  logoWidth = 180,
  logoHeight = 90,

  logoRadius = 16,

  logoGap = 40,

  speed = 35,

  hoverScale = 1.08,

  fadeWidth = 120,
}) => {
  // =====================================
  // BACKGROUND
  // =====================================
    
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
        background: `linear-gradient(
          135deg,
          ${gradientFrom},
          ${gradientTo}
        )`,
      };
    }

    return {
      backgroundColor,
    };
  };

  // =====================================
  // DUPLICATE LOGOS
  // =====================================

  const renderLogos = () => {
    const duplicated = [
      ...logos,
      ...logos,
      ...logos,
    ];

    return duplicated.map((logo, index) => (
      <div
        key={index}
        className="logo-item flex-shrink-0"
        style={{
          width: `${logoWidth}px`,
           minHeight: `${cardHeight}px`,
        }}
      >
<div
  className="flex items-center justify-center shrink-0"
  style={{
    width: `${cardWidth}px`,
    height: `${cardHeight}px`,

    background: cardBackground,
    borderRadius: `${cardRadius}px`,

    border: `${cardBorderWidth}px solid ${cardBorderColor}`,

    boxShadow: cardShadow,

    padding: `${cardPadding}px`,

    transition: "all .3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      `translateY(-${hoverMoveY}px) scale(${hoverScale})`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0) scale(1)";
  }}
>
  <img
    src={logo.image}
    alt={logo.alt || ""}
    style={{
      width: `${logoWidth}px`,
       minHeight: `${cardHeight}px`,
      objectFit: "contain",
      borderRadius: `${logoRadius}px`,
    }}
  />
</div>
      </div>
    ));
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight:
          `${sectionHeight}px`,
        ...getBackgroundStyle(),
      }}
    >
      {/* OVERLAY */}

      {overlayEnable && (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `
              linear-gradient(
                ${overlayDirection},
                ${overlayFrom},
                ${overlayTo}
              )
            `,
            opacity:
              overlayOpacity / 100,
          }}
        />
      )}

      {/* CONTENT */}

      <div className="relative z-[2] max-w-[1400px] mx-auto py-16">

        {/* TITLE */}

        <h2
          style={{
            color: titleColor,

            fontSize:
              `${titleSize}px`,

            fontWeight:
              titleWeight,

            transform: `
              translate(
                ${titleX}px,
                ${titleY}px
              )
            `,
          }}
        >
          {title}
        </h2>

        {/* LOGO ROWS */}

        <div
          className="mt-10 flex flex-col"
          style={{
            gap: `${rowGap}px`,
          }}
        >
          {Array.from({
            length: rows,
          }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="relative overflow-hidden group"
            >
              {/* LEFT FADE */}

              <div
                className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
                style={{
                  width:
                    `${fadeWidth}px`,
                  background:
                    "linear-gradient(to right,#DDF6FF,transparent)",
                }}
              />

              {/* RIGHT FADE */}

              <div
                className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
                style={{
                  width:
                    `${fadeWidth}px`,
                  background:
                    "linear-gradient(to left,#F7E4FF,transparent)",
                }}
              />

              {/* TRACK */}

              <div
                className="logo-track flex w-max"
                style={{
                  gap: `${logoGap}px`,

                  animation: `
                    marquee
                    ${speed}s
                    linear
                    infinite
                  `,
                }}
              >
                {renderLogos()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS */}

      <style>
        {`
          .logo-track:hover{
            animation-play-state: paused;
          }

          .logo-item:hover img{
            transform: scale(${hoverScale});
          }

          @keyframes marquee{
            from{
              transform:translateX(0);
            }

            to{
              transform:translateX(-33.33%);
            }
          }
        `}
      </style>
    </section>
  );
};

export default LogoSlider;