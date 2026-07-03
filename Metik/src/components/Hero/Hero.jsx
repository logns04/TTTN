import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Hero = ({
  banner = {},
  slides = [],
  arrow = {},
  dot = {}
}) => {

  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState(0);

  const {
    height = 500,
    background = "#ffffff",
    borderRadius = 0,
    shadow = false,
    autoplay = true,
    interval = 3000,
    showArrow = true,
    showDot = true,
    overlay = false,
    overlayColor = "rgba(0,0,0,.25)",
    objectFit = "cover",
    objectPosition = "center"
  } = banner;

  const {
    size = 50,
    iconSize = 20,
    color = "#ffffff",
    background: arrowBg = "rgba(255,255,255,.25)",
    hoverBackground = "#F28C28",
    hoverColor = "#ffffff",
    radius = "50%",
    offset = 15 // Đặt mặc định 15px nếu không truyền vào
  } = arrow;

  const {
    size: dotSize = 12,
    activeSize = 14,
    color: dotColor = "#ffffff",
    activeColor = "#F28C28",
    gap = 10,
    bottom = 25
  } = dot;

  useEffect(() => {
    if (!autoplay || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, slides.length]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };
  
  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const distance = startX - endX;
    if (distance > 50) next();
    if (distance < -50) prev();
  };

  if (!slides.length) return null;

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        width: "100%",
        height,
        position: "relative",
        overflow: "hidden",
        background,
        borderRadius,
        boxShadow: shadow ? "0 5px 15px rgba(0,0,0,.15)" : "none"
      }}
    >
      <img
        src={slides[current].image}
        alt={slides[current].alt || ""}
        style={{
          width: "100%",
          height: "100%",
          objectFit: slides[current].objectFit || objectFit,
          objectPosition: slides[current].objectPosition || objectPosition,
          transition: ".5s"
        }}
      />

      {/* ĐÃ FIX: Sửa lỗi cú pháp tại inset */}
      {overlay && (
        <div
          style={{
            position: "absolute",
            inset: 0, 
            background: overlayColor,
            zIndex: 1
          }}
        />
      )}

      {/* ================= Link ================= */}
      {slides[current].link && (
        <a
          href={slides[current].link}
          target={slides[current].target || "_self"}
          rel="noreferrer"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2
          }}
        />
      )}

      {/* ================= Prev ================= */}
      {showArrow && slides.length > 1 && (
        <button
          onClick={prev}
          style={{
            position: "absolute",
            left: offset,
            top: "50%",
            transform: "translateY(-50%)",
            width: size,
            height: size,
            border: "none",
            outline: "none",
            borderRadius: radius,
            background: arrowBg,
            color,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: ".3s",
            zIndex: 3
          }}
          onMouseEnter={(e)=>{
            e.currentTarget.style.background = hoverBackground;
            e.currentTarget.style.color = hoverColor;
          }}
          onMouseLeave={(e)=>{
            e.currentTarget.style.background = arrowBg;
            e.currentTarget.style.color = color;
          }}
        >
          <FaChevronLeft size={iconSize}/>
        </button>
      )}

      {/* ================= Next ================= */}
      {showArrow && slides.length > 1 && (
        <button
          onClick={next}
          style={{
            position: "absolute",
            right: offset,
            top: "50%",
            transform: "translateY(-50%)",
            width: size,
            height: size,
            border: "none",
            outline: "none",
            borderRadius: radius,
            background: arrowBg,
            color,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: ".3s",
            zIndex: 3
          }}
          onMouseEnter={(e)=>{
            e.currentTarget.style.background = hoverBackground;
            e.currentTarget.style.color = hoverColor;
          }}
          onMouseLeave={(e)=>{
            e.currentTarget.style.background = arrowBg;
            e.currentTarget.style.color = color;
          }}
        >
          <FaChevronRight size={iconSize}/>
        </button>
      )}

      {/* ================= Dots ================= */}
      {showDot && slides.length > 1 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom,
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap,
            zIndex: 3
          }}
        >
          {slides.map((item, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              style={{
                width: current === index ? activeSize : dotSize,
                height: current === index ? activeSize : dotSize,
                borderRadius: "50%",
                background: current === index ? activeColor : dotColor,
                cursor: "pointer",
                transition: ".3s"
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;