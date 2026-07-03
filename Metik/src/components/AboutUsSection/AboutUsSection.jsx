import React from "react";

const AboutUsSection = ({
  section = {},
  title = {},
  blocks = []
}) => {

  const {
    width = 1400,
    height = 900,
    background = "#fff",
    paddingTop = 80,
    paddingBottom = 80,
    paddingLeft = 20,
    paddingRight = 20,
    gap = 80
  } = section;

  const {
    text = "VỀ CHÚNG TÔI",
    subtitle = "",
    fontSize = 42,
    fontWeight = 700,
    color = "#4CAF50",
    subtitleSize = 18,
    subtitleWeight = 400,
    subtitleColor = "#666",
    subtitleWidth = 900,
    subtitleMarginTop = 20,
    align = "left",
    marginBottom = 70,
    lineWidth = 180,
    lineHeight = 8,
    lineColor = "#FFC107",
    positionX = 0,
    positionY = 0
  } = title;

  return (
    <section
      style={{
        width: `${width}px`,
        maxWidth: "100%",
        minHeight: `${height}px`,
        margin: "0 auto",
        background,
        padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
        boxSizing: "border-box"
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
          marginBottom
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize,
              fontWeight,
              color,
              textTransform: "uppercase"
            }}
          >
            {text}
          </h2>

          <div
            style={{
              width: lineWidth,
              height: lineHeight,
              background: lineColor,
              marginTop: 8
            }}
          />

          {subtitle && (
            <p
              style={{
                margin: `${subtitleMarginTop}px 0 0`,
                maxWidth: subtitleWidth,
                fontSize: subtitleSize,
                fontWeight: subtitleWeight,
                color: subtitleColor,
                lineHeight: 1.8
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ================= About Us Blocks (ĐÃ SỬA LỖI ĐÓNG THẺ TẠI ĐÂY) ================= */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap
        }}
      >
        {blocks.map((item, index) => (
          <div
            key={index}
            data-aos={item.animation || ""}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              gap: item.contentGap || 50
            }}
          >
            {/* ================= Media Left ================= */}
            {!item.reverse && (
              <div>
                {item.mediaType === "video" ? (
                  <video
                    src={item.video}
                    poster={item.poster}
                    controls={item.controls}
                    autoPlay={item.autoPlay}
                    muted={item.muted}
                    loop={item.loop}
                    style={{
                      width: item.mediaWidth || "100%",
                      height: item.mediaHeight || 450,
                      objectFit: item.objectFit || "cover",
                      borderTopLeftRadius: item.radiusTopLeft || 0,
                      borderTopRightRadius: item.radiusTopRight || 0,
                      borderBottomLeftRadius: item.radiusBottomLeft || 0,
                      borderBottomRightRadius: item.radiusBottomRight || 0,
                      transition: ".35s",
                      boxShadow: item.shadow || "0 8px 20px rgba(0,0,0,.15)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = `scale(${item.hoverScale || 1.03})`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: item.mediaWidth || "100%",
                      height: item.mediaHeight || 450,
                      objectFit: item.objectFit || "cover",
                      borderTopLeftRadius: item.radiusTopLeft || 0,
                      borderTopRightRadius: item.radiusTopRight || 0,
                      borderBottomLeftRadius: item.radiusBottomLeft || 0,
                      borderBottomRightRadius: item.radiusBottomRight || 0,
                      transition: ".35s",
                      boxShadow: item.shadow || "0 8px 20px rgba(0,0,0,.15)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = `scale(${item.hoverScale || 1.03})`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                )}
              </div>
            )}

            {/* ================= Content ================= */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <h3
                style={{
                  margin: "0 0 25px",
                  fontSize: item.titleSize || 34,
                  fontWeight: item.titleWeight || 700,
                  color: item.titleColor || "#222"
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: item.textSize || 18,
                  color: item.textColor || "#666",
                  lineHeight: item.lineHeight || 1.9,
                  textAlign: "justify"
                }}
              >
                {item.description}
              </p>
            </div>

            {/* ================= Media Right ================= */}
            {item.reverse && (
              <div>
                {item.mediaType === "video" ? (
                  <video
                    src={item.video}
                    poster={item.poster}
                    controls={item.controls}
                    autoPlay={item.autoPlay}
                    muted={item.muted}
                    loop={item.loop}
                    style={{
                      width: item.mediaWidth || "100%",
                      height: item.mediaHeight || 450,
                      objectFit: item.objectFit || "cover",
                      borderTopLeftRadius: item.radiusTopLeft || 0,
                      borderTopRightRadius: item.radiusTopRight || 0,
                      borderBottomLeftRadius: item.radiusBottomLeft || 0,
                      borderBottomRightRadius: item.radiusBottomRight || 0,
                      transition: ".35s",
                      boxShadow: item.shadow || "0 8px 20px rgba(0,0,0,.15)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = `scale(${item.hoverScale || 1.03})`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width:`${item.mediaWidth || 600}px`,
                      height: item.mediaHeight || 450,
                      objectFit: item.objectFit || "cover",
                      borderTopLeftRadius: item.radiusTopLeft || 0,
                      borderTopRightRadius: item.radiusTopRight || 0,
                      borderBottomLeftRadius: item.radiusBottomLeft || 0,
                      borderBottomRightRadius: item.radiusBottomRight || 0,
                      transition: ".35s",
                      boxShadow: item.shadow || "0 8px 20px rgba(0,0,0,.15)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = `scale(${item.hoverScale || 1.03})`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUsSection;