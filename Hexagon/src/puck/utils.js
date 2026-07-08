// ===============================
// Background
// ===============================

export function buildBackground(props) {
  const {
    backgroundType = "color",

    backgroundColor = "#ffffff",

    backgroundImage = "",

    gradientColor1 = "#2563eb",

    gradientColor2 = "#9333ea",

    gradientDirection = "to right",

    overlayColor = "#000000",

    overlayOpacity = 0,

    backgroundSize = "cover",

    backgroundPosition = "center",

    backgroundRepeat = "no-repeat",
  } = props;

  let background = "";
  let backgroundBlendMode = "normal";

  switch (backgroundType) {
    case "color":
      background = backgroundColor;
      break;

    case "gradient":
      background = `linear-gradient(${gradientDirection}, ${gradientColor1}, ${gradientColor2})`;
      break;

    case "image":
      background = `url(${backgroundImage})`;
      break;

    case "image+color":
      background = `
        linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity})),
        url(${backgroundImage})
      `;
      backgroundBlendMode = "multiply";
      break;

    case "image+gradient":
      background = `
        linear-gradient(${gradientDirection},
          ${hexToRGBA(gradientColor1, overlayOpacity)},
          ${hexToRGBA(gradientColor2, overlayOpacity)}
        ),
        url(${backgroundImage})
      `;
      break;

    default:
      background = backgroundColor;
  }

  return {
    background,
    backgroundColor,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    backgroundBlendMode,
  };
}

// ===============================
// Overlay
// ===============================

export function buildOverlay(props) {
  const {
    overlayColor = "#000000",
    overlayOpacity = 0,
  } = props;

  return {
    position: "absolute",
    inset: 0,
    background: hexToRGBA(
      overlayColor,
      overlayOpacity
    ),
    pointerEvents: "none",
  };
}

// ===============================
// Animation
// ===============================

export function buildAnimation(props) {
  if (!props.animate)
    return {};

  return {
    "data-aos":
      props.animationType || "fade-up",

    "data-aos-duration":
      props.animationDuration || 800,

    "data-aos-delay":
      props.animationDelay || 0,
  };
}

// ===============================
// Typography
// ===============================

export function buildTitleStyle(props) {
  return {
    color: props.titleColor,

    fontSize: props.titleSize,

    fontWeight: props.titleWeight,

    lineHeight: props.titleLineHeight,

    letterSpacing:
      props.titleLetterSpacing,

    textAlign:
      props.titleAlign,
  };
}

export function buildTextStyle(props) {
  return {
    color: props.textColor,

    fontSize: props.descriptionSize,

    fontWeight:
      props.descriptionWeight,

    lineHeight:
      props.descriptionLineHeight,

    letterSpacing:
      props.descriptionLetterSpacing,

    textAlign:
      props.descriptionAlign,
  };
}

// ===============================
// Button
// ===============================

export function buildButtonStyle(
  background,
  color,
  props
) {
  return {
    background,

    color,

    fontSize: props.buttonSize,

    fontWeight:
      props.buttonWeight,

    borderRadius:
      props.buttonRadius,

    padding: `${props.buttonPaddingY}px ${props.buttonPaddingX}px`,

    border: props.buttonBorder,

    transition: ".3s",

    display: "inline-flex",

    alignItems: "center",

    justifyContent: "center",

    cursor: "pointer",

    textDecoration: "none",
  };
}

// ===============================
// Container
// ===============================

export function buildContainer(props) {
  return {
    maxWidth:
      props.containerWidth || 1400,

    margin: "0 auto",

    paddingLeft:
      props.paddingX || 40,

    paddingRight:
      props.paddingX || 40,
  };
}

// ===============================
// Section
// ===============================

export function buildSection(props) {
  return {
    minHeight:
      props.height || 800,

    paddingTop:
      props.paddingTop || 100,

    paddingBottom:
      props.paddingBottom || 100,

    position: "relative",

    overflow: "hidden",
  };
}

// ===============================
// Image
// ===============================

export function buildImageStyle(props) {
  return {
    width: props.imageWidth,

    height: props.imageHeight,

    borderRadius:
      props.imageRadius,

    objectFit:
      props.imageFit || "contain",

    boxShadow: props.imageShadow
      ? "0 20px 60px rgba(0,0,0,.2)"
      : "none",
  };
}

// ===============================
// Hex => RGBA
// ===============================

export function hexToRGBA(
  hex,
  opacity
) {
  if (!hex) return "";

  let c = hex.replace("#", "");

  if (c.length === 3) {
    c =
      c[0] +
      c[0] +
      c[1] +
      c[1] +
      c[2] +
      c[2];
  }

  const r = parseInt(
    c.substring(0, 2),
    16
  );

  const g = parseInt(
    c.substring(2, 4),
    16
  );

  const b = parseInt(
    c.substring(4, 6),
    16
  );

  return `rgba(${r},${g},${b},${opacity})`;
}