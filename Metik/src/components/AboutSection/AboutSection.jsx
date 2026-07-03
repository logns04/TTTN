import React from "react";

const AboutSection = ({ section = {}, title = {}, blocks = [] }) => {
  const {
    width = 1400,
    height = 900,
    background = "#ffffff",
    paddingTop = 70,
    paddingBottom = 70,
    paddingLeft = 20,
    paddingRight = 20,
    gap = 80,
  } = section;

  const {
    text = "GIỚI THIỆU VỀ METIK",
    subtitle = "",
    fontSize = 42,
    fontWeight = 700,
    color = "#45B649",
    subtitleSize = 18,
    subtitleWeight = 400,
    subtitleColor = "#666",
    subtitleWidth = 700,
    subtitleMarginTop = 20,
    align = "left",
    marginBottom = 60,
    lineWidth = 180,
    lineHeight = 8,
    lineColor = "#FFC107",
    positionX = 0,
    positionY = 0,
  } = title;

  return (
    <section
      style={{
        width: `${width}px`,
        maxWidth: "100%",
        height: `${height}px`,
        margin: "0 auto",
        background,
        padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* ================= Title ================= */}
      <div
        style={{
          display: "flex",
          justifyContent:
            align === "center"
              ? "center"
              : align === "right"
                ? "flex-end"
                : "flex-start",
          transform: `translate(${positionX}px,${positionY}px)`,
          marginBottom,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize,
              fontWeight,
              color,
              textTransform: "uppercase",
            }}
          >
            {text}
          </h2>
          <div
            style={{
              width: lineWidth,
              height: lineHeight,
              marginTop: 8,
              background: lineColor,
            }}
          />
          {subtitle && (
            <p
              style={{
                marginTop: subtitleMarginTop,
                marginBottom: 0,
                maxWidth: subtitleWidth,
                fontSize: subtitleSize,
                fontWeight: subtitleWeight,
                color: subtitleColor,
                lineHeight: 1.8,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ================= About List (ĐÃ SỬA LỖI TẠI ĐÂY) ================= */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap,
        }}
      >
        {blocks.map((item, index) => (
          <div
            key={index}
            data-aos={item.animation || "fade-up"}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              gap: 60,
            }}
          >
            {/* ================= Image Left ================= */}
            {!item.reverse && (
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: item.imageHeight || 450,
                    objectFit: item.objectFit || "cover",
                    borderRadius: item.radius || 30,
                    display: "block",
                    transition: ".4s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>
            )}

            {/* ================= Content ================= */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h3
                style={{
                  margin: "0 0 20px",
                  fontSize: item.titleSize || 34,
                  fontWeight: item.titleWeight || 700,
                  color: item.titleColor || "#222",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: item.textSize || 18,
                  color: item.textColor || "#666",
                  lineHeight: item.lineHeight || 1.8,
                  textAlign: "justify",
                }}
              >
                {item.description}
              </p>
            </div>

            {/* ================= Image Right ================= */}
            {item.reverse && (
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: item.imageHeight || 450,
                    objectFit: item.objectFit || "cover",
                    borderRadius: item.radius || 30,
                    display: "block",
                    transition: ".4s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
