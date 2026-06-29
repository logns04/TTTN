import React from "react";

const AdminBlurTransition = (props) => {

  const height =
    props.height ??
    props.puck?.render?.height;

  const blur =
    props.blur ??
    props.puck?.render?.blur;

  const opacity =
    props.opacity ??
    props.puck?.render?.opacity;

  const backgroundType =
    props.backgroundType ??
    props.puck?.render?.backgroundType;

  const backgroundColor =
    props.backgroundColor ??
    props.puck?.render?.backgroundColor;

  const gradientFrom =
    props.gradientFrom ??
    props.puck?.render?.gradientFrom;

  const gradientTo =
    props.gradientTo ??
    props.puck?.render?.gradientTo;

  const gradientDirection =
    props.gradientDirection ??
    props.puck?.render?.gradientDirection;

  const borderRadius =
    props.borderRadius ??
    props.puck?.render?.borderRadius;

  const marginTop =
    props.marginTop ??
    props.puck?.render?.marginTop;

  const marginBottom =
    props.marginBottom ??
    props.puck?.render?.marginBottom;

  const paddingTop =
    props.paddingTop ??
    props.puck?.render?.paddingTop;

  const paddingBottom =
    props.paddingBottom ??
    props.puck?.render?.paddingBottom;

  const getBackground = () => {

    if(backgroundType==="gradient"){

      return `linear-gradient(
        ${gradientDirection},
        ${gradientFrom},
        ${gradientTo}
      )`;

    }

    return backgroundColor;

  };

  return(

<section

className="relative overflow-hidden"

style={{

height:`${height}px`,

marginTop:`${marginTop}px`,

marginBottom:`${marginBottom}px`,

paddingTop:`${paddingTop}px`,

paddingBottom:`${paddingBottom}px`

}}

>

<div

className="absolute inset-0"

style={{

background:getBackground(),

opacity,

filter:`blur(${blur}px)`,

borderRadius:`${borderRadius}px`,

transform:"scale(1.3)"

}}

></div>

<div

className="absolute inset-0"

style={{

backdropFilter:`blur(${blur/2}px)`,

WebkitBackdropFilter:`blur(${blur/2}px)`,

maskImage:
"linear-gradient(to bottom,transparent,black 20%,black 80%,transparent)",

WebkitMaskImage:
"linear-gradient(to bottom,transparent,black 20%,black 80%,transparent)"

}}

></div>

</section>

  );

};

export default AdminBlurTransition;