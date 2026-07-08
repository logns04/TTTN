export default function Banner({
  badge,
  showBadge,

  title,
  highlight,
  description,

  image,
  imageAlt,

  imageWidth,
  imageHeight,
  imageRadius,
  imageShadow,

  button1Text,
  button1Link,

  button2Text,
  button2Link,

  showButton2,

  backgroundColor,
  backgroundImage,

  titleColor,
  highlightColor,
  textColor,

  badgeColor,
  badgeBackground,

  button1Color,
  button1TextColor,

  button2Color,
  button2TextColor,

  badgeSize,

  titleSize,
  titleWeight,
  titleLineHeight,

  highlightSize,
  highlightWeight,

  descriptionSize,
  descriptionLineHeight,

  buttonSize,

  scrollTextSize,

  contentWidth,

  height,

  reverse,

  paddingTop,
  paddingBottom,

  scrollText,
  showScroll,
}) {
  return (
    <section
      style={{
        backgroundColor,
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: `${height}px`,
        paddingTop,
        paddingBottom,
      }}
      className="relative overflow-hidden"
    >
      <div
        className={`mx-auto flex max-w-350 items-center justify-between gap-20 px-10 ${
          reverse ? "flex-row-reverse" : ""
        }`}
      >
        {/* Left */}

        <div
          style={{ maxWidth: contentWidth }}
          className="flex-1"
        >
          {showBadge && (
            <div
              style={{
                color: badgeColor,
                background: badgeBackground,
                borderColor: badgeColor,
              }}
             className="mb-10 inline-flex rounded-full border px-7 py-3 font-bold uppercase tracking-wider"

style={{
  color: badgeColor,
  background: badgeBackground,
  borderColor: badgeColor,
  fontSize: badgeSize,
}}
            >
              {badge}
            </div>
          )}

          <h1
            style={{
              color: titleColor,
            }}
            className="mb-5"

style={{
  color: titleColor,
  fontSize: titleSize,
  fontWeight: titleWeight,
  lineHeight: titleLineHeight,
}}
          >
            {title}
          </h1>

          <h2
            style={{
              color: highlightColor,
            }}
            className="mb-8"

style={{
  color: highlightColor,
  fontSize: highlightSize,
  fontWeight: highlightWeight,
}}
          >
            {highlight}
          </h2>

          <p
            style={{
              color: textColor,
            }}
            className="mb-12 max-w-xl"

style={{
  color: textColor,
  fontSize: descriptionSize,
  lineHeight: descriptionLineHeight,
}}
          >
            {description}
          </p>

          <div className="flex gap-6">
            <a
              href={button1Link}
              style={{
                background: button1Color,
                color: button1TextColor,
              }}
              className="rounded-xl px-10 py-5 font-semibold shadow-xl"

style={{
  background: button1Color,
  color: button1TextColor,
  fontSize: buttonSize,
}}
            >
              {button1Text}
            </a>

            {showButton2 && (
              <a
                href={button2Link}
                style={{
                  background: button2Color,
                  color: button2TextColor,
                  borderColor: button2TextColor,
                }}
                className="rounded-xl px-10 py-5 font-semibold shadow-xl transition hover:bg-white hover:text-black"
                style={{
  background: button2Color,
  color: button2TextColor,
  borderColor: button2TextColor,
  fontSize: buttonSize,
}}
              >
                {button2Text}
              </a>
            )}
          </div>
        </div>

        {/* Right */}

        <div
style={{
  width: imageWidth,
  height: imageHeight,
  borderRadius: imageRadius,
  boxShadow: imageShadow
    ? "0 30px 80px rgba(0,0,0,.25)"
    : "none",
}}
         className="object-contain"
        >
          {image && (
            <img
              src={image}
              alt={imageAlt}
              className="w-full object-contain"
            />
          )}
        </div>
      </div>

      {showScroll && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white">
          <p
  className="mb-3 opacity-80"
  style={{
    fontSize: scrollTextSize,
    color: textColor,
  }}
>
            {scrollText}
          </p>

          <div className="animate-bounce text-3xl">
            ↓
          </div>
        </div>
      )}
    </section>
  );
}