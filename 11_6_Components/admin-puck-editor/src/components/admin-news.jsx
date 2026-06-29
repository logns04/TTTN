import React from "react";
import newsData from "../data/newsData";

const AdminNewsSection = (props) => {

  const sectionHeight =
    props.sectionHeight ??
    props.puck?.render?.sectionHeight;

  const title =
    props.title ??
    props.puck?.render?.title;

  const titleColor =
    props.titleColor ??
    props.puck?.render?.titleColor;

  const titleSize =
    props.titleSize ??
    props.puck?.render?.titleSize;

  const titleAlign =
    props.titleAlign ??
    props.puck?.render?.titleAlign;

  const titlePaddingTop =
    props.titlePaddingTop ??
    props.puck?.render?.titlePaddingTop;

  const titlePaddingBottom =
    props.titlePaddingBottom ??
    props.puck?.render?.titlePaddingBottom;

  const cardGap =
    props.cardGap ??
    props.puck?.render?.cardGap;

  const cardRadius =
    props.cardRadius ??
    props.puck?.render?.cardRadius;

  const imageHeight =
    props.imageHeight ??
    props.puck?.render?.imageHeight;

  const cardShadow =
    props.cardShadow ??
    props.puck?.render?.cardShadow;

  const buttonText =
    props.buttonText ??
    props.puck?.render?.buttonText;

  const buttonBg =
    props.buttonBg ??
    props.puck?.render?.buttonBg;

  const buttonColor =
    props.buttonColor ??
    props.puck?.render?.buttonColor;

  const buttonRadius =
    props.buttonRadius ??
    props.puck?.render?.buttonRadius;

  const background =
    props.background ??
    props.puck?.render?.background;

  const overlay =
    props.overlay ??
    props.puck?.render?.overlay;

  const news =
    props.news ??
    props.puck?.render?.news ??
    newsData;

  const getBackgroundStyle = () => {

    const bg = background || {};

    if (bg.type === "gradient") {
      return {
        background: `linear-gradient(${bg.gradientDirection || "to right"}, ${bg.gradientFrom || "#ffffff"}, ${bg.gradientTo || "#f3f4f6"})`
      };
    }

    if ((bg.type === "image" || bg.type === "gif") && bg.imageUrl) {
      return {
        backgroundImage: `url(${bg.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }

    return {
      backgroundColor: bg.color || "#ffffff"
    };

  };

  const titleSizeMap = {
    sm: "text-2xl",
    base: "text-3xl",
    lg: "text-4xl",
    xl: "text-5xl",
    "2xl": "text-6xl"
  };

  return (

    <section
      className="relative w-full overflow-hidden"
      style={{
        ...getBackgroundStyle(),
        minHeight: `${sectionHeight}px`
      }}
    >

      {overlay?.enabled && (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(${overlay.direction || "to right"}, ${overlay.gradientFrom || "rgba(0,0,0,.35)"}, ${overlay.gradientTo || "rgba(0,0,0,.15)"})`,
            opacity: overlay.opacity ?? .4
          }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <h2
          className={`${titleSizeMap[titleSize] || "text-5xl"} font-bold uppercase`}
          style={{
            color: titleColor,
            textAlign: titleAlign,
            paddingTop: `${titlePaddingTop}px`,
            paddingBottom: `${titlePaddingBottom}px`
          }}
        >
          {title}
        </h2>

        <div
          className="grid md:grid-cols-3"
          style={{
            gap: `${cardGap}px`
          }}
        >
              {news.map((item, index) => (

            <div
              key={index}
              className="bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                borderRadius: `${cardRadius}px`,
                boxShadow: cardShadow
              }}
            >

              <div
                className="relative overflow-hidden"
                style={{
                  height: `${imageHeight}px`
                }}
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                />

                <div
                  className="absolute left-4 top-4 bg-blue-700 text-white text-center px-3 py-2"
                  style={{
                    borderRadius: "12px"
                  }}
                >

                  <div
                    className="text-2xl font-bold leading-none"
                  >
                    {item.day}
                  </div>

                  <div
                    className="text-xs uppercase"
                  >
                    {item.month}
                  </div>

                </div>

              </div>

              <div className="p-6">

                <div
                  className="flex items-center gap-2 text-sm text-slate-500 mb-3"
                >

                  <span>
                    📅
                  </span>

                  <span>
                    {item.date}
                  </span>

                </div>

                <h3
                  className="text-xl font-bold text-slate-800 leading-snug mb-4 transition-colors duration-300 hover:text-blue-700"
                >
                  {item.title}
                </h3>

                <p
                  className="text-slate-600 leading-7 mb-6 line-clamp-3"
                >
                  {item.description}
                </p>

                <a
                  href={item.url || "#"}
                  className="inline-flex items-center justify-center transition-all duration-300 hover:scale-105"
                  style={{
                    background: buttonBg,
                    color: buttonColor,
                    borderRadius: `${buttonRadius}px`,
                    padding: "12px 28px"
                  }}
                >
                  {buttonText}
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

};

export default AdminNewsSection;