import Header from "../components/Header/Header";
import HeroBanner from "../components/HeroBanner/HeroBanner";
const config = {
  components: {
    Header: {
      fields: { 
        headerHeight: {
  type: "number",
  label: "Height",
  group: "Header",
},

backgroundColor: {
  type: "text",
  label: "Background Color",
  group: "Header",
},
logo: {
  type: "text",
  label: "Logo URL",
  group: "Logo",
},

logoWidth: {
  type: "number",
  label: "Width",
  group: "Logo",
},

logoHeight: {
  type: "number",
  label: "Height",
  group: "Logo",
},

logoX: {
  type: "number",
  label: "Left",
  group: "Logo",
},

logoY: {
  type: "number",
  label: "Top",
  group: "Logo",
},

logoBorderWidth: {
  type: "number",
  label: "Border Width",
  group: "Logo",
},

logoBorderColor: {
  type: "text",
  label: "Border Color",
  group: "Logo",
},

logoBorderRadius: {
  type: "number",
  label: "Border Radius",
  group: "Logo",
},

clubName: {
  type: "textarea",
  label: "Text",
  group: "Title",
},

titleColor: {
  type: "text",
  label: "Color",
  group: "Title",
},

titleFontSize: {
  type: "number",
  label: "Font Size",
  group: "Title",
},

titleFontWeight: {
  type: "number",
  label: "Font Weight",
  group: "Title",
},

titleX: {
  type: "number",
  label: "Left",
  group: "Title",
},

titleY: {
  type: "number",
  label: "Top",
  group: "Title",
},
menuItems: {
  type: "array",

  getItemSummary: (item) =>
    item?.label || "Menu",

  arrayFields: {
    label: {
      type: "text",
    },

    link: {
      type: "text",
    },
  },
},
menuColor: {
  type: "text",
  label: "Text Color",
  group: "Menu",
},

menuHoverColor: {
  type: "text",
  label: "Hover Color",
  group: "Menu",
},

menuFontSize: {
  type: "number",
  label: "Font Size",
  group: "Menu",
},

menuFontWeight: {
  type: "number",
  label: "Font Weight",
  group: "Menu",
},

menuGap: {
  type: "number",
  label: "Gap",
  group: "Menu",
},

menuX: {
  type: "number",
  label: "Left",
  group: "Menu",
},

menuY: {
  type: "number",
  label: "Top",
  group: "Menu",
},

menuHoverScale: {
  type: "number",
  label: "Hover Scale",
  group: "Menu",
},

menuTransition: {
  type: "number",
  label: "Transition",
  group: "Menu",
},
showLanguage: {
  type: "radio",
  label: "Show",
  group: "Language",

  options: [
    {
      label: "Show",
      value: true,
    },
    {
      label: "Hide",
      value: false,
    },
  ],
},
languageSize: {
  type: "number",
  label: "Size",
  group: "Language",
},

languageX: {
  type: "number",
  label: "Left",
  group: "Language",
},

languageY: {
  type: "number",
  label: "Top",
  group: "Language",
},

languageBackground: {
  type: "text",
  label: "Background",
  group: "Language",
},

languageActiveColor: {
  type: "text",
  label: "Active Color",
  group: "Language",
},

languageTextColor: {
  type: "text",
  label: "Text Color",
  group: "Language",
},

languageBorderRadius: {
  type: "number",
  label: "Radius",
  group: "Language",
},

      },

      defaultProps: {
        logo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7otC3yMjrJiSGYEpJT_Tk0kAalswAzFG5ug&s",

        clubName:
          "CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP\nTẠI TP.HỒ CHÍ MINH",

        backgroundColor: "#003DA5",

        logoWidth: 60,
        logoHeight: 60,
        logoX: 20,
        logoY: 10,
        logoBorderWidth: 0,
        logoBorderColor: "#ffffff",
        logoBorderRadius: 0,

        titleColor: "#ffffff",
        titleFontSize: 20,
        titleX: 100,
        titleY: 15,

        menuColor: "#ffffff",
        menuFontSize: 16,
        menuX: 700,
        menuY: 30,
        menuItems: [
  {
    label: "Trang chủ",
    link: "/",
  },
    {
    label: "Giới thiệu",
    link: "/",
  },
      {
    label: "Hội viên",
    link: "/",
  },
      {
    label: "Hoạt động Ban",
    link: "/",
  },
  
  
],
        showLanguage: true,

        languageSize: 36,
        languageX: 1180,
        languageY: 20,
        languageBackground: "#d4a600",
        languageActiveColor: "#000000",
      },

      render: (props) => (
        <Header {...props} />
      ),
    },
HeroBanner: {
  fields: {
    // =====================
    // BACKGROUND
    // =====================
height: {
  type: "number",
  label: "Banner Height",
  group: "Background",
},

backgroundType: {
  type: "select",
  label: "Background Type",
  group: "Background",

  options: [
    {
      label: "Color",
      value: "color",
    },
    {
      label: "Gradient",
      value: "gradient",
    },
    {
      label: "Image/Gif",
      value: "image",
    },
  ],
},

backgroundColor: {
  type: "text",
  label: "Background Color",
  group: "Background",
},

gradientFrom: {
  type: "text",
  label: "Gradient From",
  group: "Background",
},

gradientTo: {
  type: "text",
  label: "Gradient To",
  group: "Background",
},

backgroundImage: {
  type: "text",
  label: "Background Image",
  group: "Background",
},
    // =====================
    // CONTENT BOXES
    // =====================
blocks: {
  type: "array",
  label: "Content Boxes",
  group: "Content Boxes",

  getItemSummary: (item) =>
    item?.title || "Sen Hồng",

  arrayFields: {
    x: {
      type: "number",
      label: "Left",
    },

    y: {
      type: "number",
      label: "Top",
    },

    width: {
      type: "number",
      label: "Width",
    },

    height: {
      type: "number",
      label: "Height",
    },

    background: {
      type: "text",
      label: "Background",
    },

    borderWidth: {
      type: "number",
      label: "Border Width",
    },

    borderColor: {
      type: "text",
      label: "Border Color",
    },

    shadow: {
      type: "text",
      label: "Shadow",
    },
        // ===== Subtitle =====
        subTitle: {
          type: "text",
        },

        subTitleColor: {
          type: "text",
        },

        subTitleSize: {
          type: "number",
        },

        // ===== Title =====
        title: {
          type: "text",
        },

        titleColor: {
          type: "text",
        },

        titleSize: {
          type: "number",
        },

        // ===== Description =====
        description: {
          type: "textarea",
        },

        descriptionColor: {
          type: "text",
        },

        descriptionSize: {
          type: "number",
        },

        textAlign: {
          type: "select",
          options: [
            {
              label: "Left",
              value: "left",
            },
            {
              label: "Center",
              value: "center",
            },
            {
              label: "Right",
              value: "right",
            },
          ],
        },

        // =====================
        // BUTTONS
        // =====================
buttons: {
  type: "array",
  arrayFields: {
    text: {
      type: "text",
    },

    link: {
      type: "text",
    },

    x: {
      type: "number",
    },

    y: {
      type: "number",
    },

    width: {
      type: "number",
    },

    height: {
      type: "number",
    },

    background: {
      type: "text",
    },

    color: {
      type: "text",
    },

    radiusTL: {
      type: "number",
    },

    radiusTR: {
      type: "number",
    },

    radiusBL: {
      type: "number",
    },

    radiusBR: {
      type: "number",
    },

    borderWidth: {
      type: "number",
    },

    borderColor: {
      type: "text",
    },

    fontSize: {
      type: "number",
    },

    fontWeight: {
      type: "number",
    },
  },
},
      },
    },
  },

  defaultProps: {
    height: 850,

    backgroundType: "gradient",

    backgroundColor: "#0d6efd",

    gradientFrom: "#0d6efd",

    gradientTo: "#6ec6ff",

    backgroundImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",

    blocks: [
      {
        x: 80,
        y: 180,

        width: 580,
        height: 400,

        background:
          "rgba(255,255,255,.15)",

        borderColor:
          "rgba(255,255,255,.25)",

        borderWidth: 1,

        shadow:
          "0 20px 40px rgba(0,0,0,.2)",

        radiusTL: 80,
        radiusTR: 80,
        radiusBL: 80,
        radiusBR: 20,

        subTitle:
          "LAN TỎA GIÁ TRỊ ĐẤT",

        subTitleColor: "#ffffff",

        subTitleSize: 18,

        title: "Sen Hồng",

        titleColor: "#FFE98A",

        titleSize: 72,

        description:
          "CLB Doanh nhân Đồng Tháp tại TP.HCM quy tụ những người con quê hương Đồng Tháp.",

        descriptionColor: "#ffffff",

        descriptionSize: 18,

        textAlign: "left",

buttons: [
  {
    text: "Tham gia cộng đồng",
    link: "#",

    x: 0,
    y: 0,

    width: 220,
    height: 55,

    background: "#0d6efd",
    color: "#ffffff",

    radiusTL: 20,
    radiusTR: 20,
    radiusBL: 20,
    radiusBR: 20,

    borderWidth: 0,
    borderColor: "#ffffff",

    fontSize: 18,
    fontWeight: 700,
  },
],
      },
    ],
  },

  render: (props) => (
    <HeroBanner {...props} />
  ),
},
  },
};

export default config;