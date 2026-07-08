export const backgroundFields = {

  backgroundType:{

    type:"select",

    label:"Kiểu nền",

    options:BACKGROUND_TYPES

  },

  backgroundColor:{

    type:"text",

    label:"Màu nền"

  },

  gradientColor1:{

    type:"text",

    label:"Gradient 1"

  },

  gradientColor2:{

    type:"text",

    label:"Gradient 2"

  },

  gradientDirection:{

    type:"select",

    label:"Hướng Gradient",

    options:GRADIENT_DIRECTIONS

  },

  backgroundImage:{

    type:"text",

    label:"Ảnh nền"

  },

  overlayColor:{

    type:"text",

    label:"Overlay"

  },

  overlayOpacity:{

    type:"number",

    label:"Opacity"

  }

};
export const animationFields={

animate:{

type:"radio",

label:"Animation",

options:[

{

label:"Bật",

value:true

},

{

label:"Tắt",

value:false

}

]

},

animationType:{

type:"select",

label:"Hiệu ứng",

options:ANIMATIONS

},

animationDuration:{

type:"number",

label:"Duration"

}

};
export const buttonFields={

buttonText:{

type:"text"

},

buttonLink:{

type:"text"

},

buttonBackground:{

type:"text"

},

buttonColor:{

type:"text"

},

buttonRadius:{

type:"number"

},

buttonPaddingX:{

type:"number"

},

buttonPaddingY:{

type:"number"

},

buttonFontSize:{

type:"number"

}

};