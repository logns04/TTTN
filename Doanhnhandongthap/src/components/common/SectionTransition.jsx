import React from "react";

const SectionTransition = ({
  show = true,

  height = 120,

  colorFrom = "rgba(255,255,255,0)",

  colorTo = "rgba(255,255,255,1)",

  blur = 0,

  direction = "to bottom",

  zIndex = 10,
}) => {
  if (!show) return null;

  return (
    <div
      className="absolute left-0 bottom-0 w-full pointer-events-none"
      style={{
        height: `${height}px`,

        zIndex,

        background: `linear-gradient(
          ${direction},
          ${colorFrom},
          ${colorTo}
        )`,

        filter: `blur(${blur}px)`,
      }}
    />
  );
};

export default SectionTransition;