import React, {
  useEffect,
  useRef
} from "react";
import { countUp } from '../utils/countUp';

const AdminStatsSection = (props) => {
console.log("Stats mới:", props.stats);
  const {
    sectionHeight,
    title,
    titleColor,
    titleSize,
    titleAlign,
    stats,
    background,
    overlay, 
    titlePaddingTop,

    titlePaddingBottom,

    statsPaddingTop,

    statsPaddingBottom,

    statsGap,

    titleVertical,

  } = props;

  const refs = useRef([]);

  const titleSizeMap = {
    sm: "text-2xl",
    base: "text-3xl",
    lg: "text-4xl",
    xl: "text-5xl",
    "2xl": "text-6xl"
  };
    const numberSizeMap = {
    sm: "text-3xl",
    base: "text-4xl",
    lg: "text-5xl",
    xl: "text-6xl",
    "2xl": "text-7xl"
    };

    const textSizeMap = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg"
    };
  const getBackgroundStyle = () => {

    if (background?.type === "gradient") {
      return {
        background: `linear-gradient(
          ${background.gradientDirection || "to right"},
          ${background.gradientFrom || "#ffffff"},
          ${background.gradientTo || "#f3f4f6"}
        )`
      };
    }

    if (
      (background?.type === "image" ||
        background?.type === "gif") &&
      background?.imageUrl
    ) {
      return {
        backgroundImage: `url(${background.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      };
    }
    
    return {
      backgroundColor:
        background?.color || "#ffffff"
    };
  };

  useEffect(() => {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              const target =
                Number(
                  entry.target.dataset.value
                );

            countUp({
            element: entry.target,
            target,
            duration: 2000,
            suffix:
                entry.target.dataset.suffix || ''
            });

              observer.unobserve(
                entry.target
              );
            }

          });

        },
        {
          threshold: 0.3
        }
      );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();

}, [stats]);

  return (
<section

className="relative overflow-hidden"

style={{

...getBackgroundStyle(),

minHeight: `${sectionHeight}px`

}}

>

      {overlay?.enabled && (
        <div
          className="
            absolute
            inset-0
            z-0
          "
          style={{
            background: `linear-gradient(
              ${overlay.direction || "to bottom"},
              ${overlay.gradientFrom || "#ffffff"},
              ${overlay.gradientTo || "#c084fc"}
            )`,
            opacity:
              overlay.opacity || 0.3
          }}
        />
      )}

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
        "
      >
<div

style={{

display: "flex",

justifyContent: titleVertical,

paddingTop: `${titlePaddingTop}px`,

paddingBottom: `${titlePaddingBottom}px`

}}

>

<h2

className={`

font-bold

w-full

${titleSizeMap[titleSize]}

`}

style={{

color: titleColor,

textAlign: titleAlign

}}

>

{title}

</h2>

</div>
<div

className="grid md:grid-cols-4"

style={{

gap: `${statsGap}px`,

paddingTop: `${statsPaddingTop}px`,

paddingBottom: `${statsPaddingBottom}px`

}}

>

{stats?.map((item, index) => (
  <div
    key={index}
    style={{
      padding:
        `${item.padding || 0}px`,

      textAlign:
        item.align || 'center'
    }}
  >

        <h3
        ref={(el) =>
            refs.current[index] = el
        }
        data-value={item.number}
        data-suffix={item.suffix || ''}
        className={`
            ${numberSizeMap[item.numberSize] || 'text-6xl'}
            font-bold
            mb-4
        `}
        style={{
            color:
            item.numberColor || '#0f172a'
        }}
        >
        0
        </h3>

        <p
        className={`
            ${textSizeMap[item.textSize] || 'text-base'}
            leading-relaxed
        `}
        style={{
            color:
            item.textColor || '#374151'
        }}
        >
        {item.text}
        </p>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
};

export default AdminStatsSection;