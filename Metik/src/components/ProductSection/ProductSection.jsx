import React from "react";

const ProductSection = ({
  section = {},
  title = {},
  card = {},
  products = []
}) => {

const {
  width = 1400,
  height = 700,
  background = "#ffffff",
  paddingTop = 60,
  paddingBottom = 60,
  paddingLeft = 20,
  paddingRight = 20
} = section;

  const {
    text = "SẢN PHẨM MỚI",
    fontSize = 42,
    fontWeight = 700,
    color = "#4CAF50",
    align = "left",
    marginBottom = 40,
    lineWidth = 180,
    lineHeight = 8,
    lineColor = "#FFC107",
    positionX = 0,
    positionY = 0
  } = title;

  const {
    columns = 4,
    gap = 35,
    imageHeight = 380,
    radius = 0,
    border = "1px solid #e5e5e5",
    background: cardBg = "#fff",
    shadow = "0 3px 10px rgba(0,0,0,.08)",
    hoverScale = 1.04,
    hoverShadow = "0 10px 30px rgba(0,0,0,.18)",
    nameSize = 20,
    nameWeight = 700,
    nameColor = "#F28C28",
    hoverColor = "#0f9d58",
    padding = 22
  } = card;

  return (
<section
  style={{
width: "100%",
maxWidth: `${width}px`,
height: `${height}px`,
margin: "0 auto",
    background,
    padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
    boxSizing: "border-box"
  }}
>
<div
  style={{
    width: "100%",
    margin: "0 auto"
  }}
>
        {}
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
          </div>
        </div>

        {}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap
          }}
        >
          {products.map((item, index) => (
            <a
              key={index}
              href={item.link || "#"}
              style={{
                textDecoration: "none",
                color: "inherit"
              }}
            >
              <div
                style={{
                  background: cardBg,
                  border,
                  borderRadius: radius,
                  overflow: "hidden",
                  boxShadow: shadow,
                  transition: ".35s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `scale(${hoverScale})`;
                  e.currentTarget.style.boxShadow = hoverShadow;
                  // Hiệu ứng zoom nhẹ ảnh khi hover vào card
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = shadow;
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                {}
                <div
                  style={{
                    width: "100%",
                    height: imageHeight,
                    overflow: "hidden"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: item.objectFit || "cover",
                      transition: ".4s"
                    }}
                  />
                </div>

                {}
                <div
                  style={{
                    padding,
                    textAlign: "center"
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: nameSize,
                      fontWeight: nameWeight,
                      color: nameColor,
                      transition: ".3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = hoverColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = nameColor;
                    }}
                  >
                    {item.name}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProductSection;