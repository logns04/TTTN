import Header from "../components/Header/Header";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import LogoSlider from "../components/LogoSlider/LogoSlider";
import AboutOrganization from "../components/AboutOrganization/AboutOrganization";
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
logoWidthTablet: {
  type: "number",
},

logoWidthMobile: {
  type: "number",
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
        logoWidth: 60,

        logoWidthTablet: 50,

        logoWidthMobile: 40,
        logo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7otC3yMjrJiSGYEpJT_Tk0kAalswAzFG5ug&s",

        clubName:
          "CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP\nTẠI TP.HỒ CHÍ MINH",

        backgroundColor: "#3B71DB",

        logoWidth: 60,
        logoHeight: 60,
        logoX: 20,
        logoY: 10,
        logoBorderWidth: 0,
        logoBorderColor: "#ffffff",
        logoBorderRadius: 50,

        titleColor: "#ffffff",
        titleFontSize: 14,
        titleX: 100,
        titleY: 15,

        menuColor: "#ffffff",
        menuFontSize: 16,
        menuX: 810,
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
        languageX: 1500,
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
overlayEnable: {
  type: "radio",
  label: "Overlay",
  group: "Overlay",
  options: [
    {
      label: "Bật",
      value: true,
    },
    {
      label: "Tắt",
      value: false,
    },
  ],
},

overlayFrom: {
  type: "text",
  label: "Overlay From",
  group: "Overlay",
},

overlayTo: {
  type: "text",
  label: "Overlay To",
  group: "Overlay",
},

overlayDirection: {
  type: "text",
  label: "Direction",
  group: "Overlay",
},

overlayOpacity: {
  type: "number",
  label: "Opacity",
  group: "Overlay",
},
showTransition: {
  type: "radio",
  label: "Section Transition",

  options: [
    {
      label: "On",
      value: true,
    },
    {
      label: "Off",
      value: false,
    },
  ],
},

transitionHeight: {
  type: "number",
  label: "Transition Height",
},

transitionColorFrom: {
  type: "text",
  label: "Transition From",
},

transitionColorTo: {
  type: "text",
  label: "Transition To",
},

transitionBlur: {
  type: "number",
  label: "Transition Blur",
},

transitionDirection: {
  type: "select",

  options: [
    {
      label: "Bottom",
      value: "to bottom",
    },

    {
      label: "Top",
      value: "to top",
    },

    {
      label: "Right",
      value: "to right",
    },

    {
      label: "Left",
      value: "to left",
    },
  ],
},
    // =====================
    // CONTENT BOXES
    // =====================
blocks: {
  type: "array",
  label: "Content Boxes",
  group: "Content Boxes",

  getItemSummary: (item) =>
    item?.title || "Khối",

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
    showTransition: true,

transitionHeight: 150,

transitionColorFrom:
  "rgba(255,255,255,0)",

transitionColorTo:
  "rgba(255,255,255,1)",

transitionBlur: 35,

transitionDirection:
  "to bottom",
    backgroundType: "gradient",

    backgroundColor: "#0d6efd",

    gradientFrom: "#0d6efd",

    gradientTo: "#6ec6ff",

    backgroundImage:
      "https://webdemo.hexagon.xyz/medias/hieuunghero.webp",
    overlayEnable: true,

overlayFrom:
  "#3B71DB",

overlayTo:
  "#BCE6F4",

overlayDirection:
  "180deg",

overlayOpacity: 85,
    blocks: [
      {
        x: 150,
        y: 180,

        width: 640,
        height: 400,

        background:
          "rgba(255,255,255,.15)",

        borderColor:
          "rgba(255,255,255,.25)",

        borderWidth: 1,

        shadow:
          "0 20px 40px rgba(0,0,0,.2)",

        radiusTL: 5,
        radiusTR: 150,
        radiusBL: 150,
        radiusBR: 5,

        subTitle:
          "LAN TỎA GIÁ TRỊ ĐẤT",

        subTitleColor: "#ffffff",

        subTitleSize: 18,

        title: "Sen Hồng",

        titleColor: "#FFE98A",

        titleSize: 72,

        description:
          "CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác - Đổi mới - Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sẻ chia nghĩa tình quê hương.",

        descriptionColor: "#ffffff",

        descriptionSize: 18,

        textAlign: "left",

buttons: [
  {
    text: "Tham gia cộng đồng",
    link: "#",

    x: 190,
    y: -8,

    width: 220,
    height: 55,

    background: "#0d6efd",
    color: "#ffffff",

    radiusTL: 0,
    radiusTR: 30,
    radiusBL: 30,
    radiusBR: 0,

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
LogoSlider: {
  fields: {

    // =====================
    // BACKGROUND
    // =====================

    sectionHeight: {
      type: "number",
      label: "Height",
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
      group: "Background",
    },

    gradientFrom: {
      type: "text",
      group: "Background",
    },

    gradientTo: {
      type: "text",
      group: "Background",
    },

    backgroundImage: {
      type: "text",
      group: "Background",
    },

    overlayEnable: {
      type: "radio",
      group: "Background",

      options: [
        {
          label: "Bật",
          value: true,
        },
        {
          label: "Tắt",
          value: false,
        },
      ],
    },

    overlayFrom: {
      type: "text",
      group: "Background",
    },

    overlayTo: {
      type: "text",
      group: "Background",
    },

    overlayDirection: {
      type: "text",
      group: "Background",
    },

    overlayOpacity: {
      type: "number",
      group: "Background",
    },

    // =====================
    // TITLE
    // =====================

    title: {
      type: "text",
      group: "Title",
    },

    titleColor: {
      type: "text",
      group: "Title",
    },

    titleSize: {
      type: "number",
      group: "Title",
    },

    titleWeight: {
      type: "number",
      group: "Title",
    },

    titleX: {
      type: "number",
      group: "Title",
    },

    titleY: {
      type: "number",
      group: "Title",
    },

    // =====================
    // SLIDER
    // =====================

    rows: {
      type: "number",
      group: "Slider",
    },

    rowGap: {
      type: "number",
      group: "Slider",
    },

    logoWidth: {
      type: "number",
      group: "Slider",
    },

    logoHeight: {
      type: "number",
      group: "Slider",
    },

    logoRadius: {
      type: "number",
      group: "Slider",
    },

    logoGap: {
      type: "number",
      group: "Slider",
    },

    speed: {
      type: "number",
      group: "Slider",
    },

    hoverScale: {
      type: "number",
      group: "Slider",
    },

    fadeWidth: {
      type: "number",
      group: "Slider",
    },

    // =====================
    // LOGOS
    // =====================
    cardWidth: {
  type: "number",
  label: "Card Width",
  group: "Logo",
},

cardHeight: {
  type: "number",
  label: "Card Height",
  group: "Logo",
},

cardBackground: {
  type: "text",
  label: "Card Background",
  group: "Logo",
},

cardRadius: {
  type: "number",
  label: "Card Radius",
  group: "Logo",
},

cardPadding: {
  type: "number",
  label: "Card Padding",
  group: "Logo",
},

cardBorderWidth: {
  type: "number",
  label: "Card Border Width",
  group: "Logo",
},

cardBorderColor: {
  type: "text",
  label: "Card Border Color",
  group: "Logo",
},

cardShadow: {
  type: "text",
  label: "Card Shadow",
  group: "Logo",
},
    logos: {
      type: "array",
      group: "Logos",

      getItemSummary: (item) =>
        item?.alt || "Logo",

      arrayFields: {
        image: {
          type: "text",
        },

        alt: {
          type: "text",
        },
      },
    },
  },

  defaultProps: {
    sectionHeight: 300,

    backgroundType: "color",
    backgroundColor: "#BCE6F4",

    gradientFrom: "#BCE6F4",
    gradientTo: "#0D6EFD",

    backgroundImage: "",

    overlayEnable: false,

    overlayFrom:
      "#BCE6F4",

    overlayTo:
      "rgba(0,61,165,.2)",

    overlayDirection:
      "90deg",

    overlayOpacity: 100,

    title: "HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH",

    titleColor: "#003DA5",

    titleSize: 24,

    titleWeight: 700,

    titleX: 350,
    titleY: -22,
    cardWidth: 175,
    cardHeight: 110,

cardBackground: "#ffffff",

cardRadius: 20,

cardBorderWidth: 0,
cardBorderColor: "#e5e7eb",

cardPadding: 44,

cardShadow:
  "0 10px 30px rgba(0,0,0,.08)",
    rows: 1,

    rowGap: 30,

    logoWidth: 180,

    logoHeight: 90,

    logoRadius: 16,

    logoGap: 40,

    speed: 15,

    hoverScale: 1.08,

    fadeWidth: 120,

    logos: [
      {
        image:
          "https://webdemo.hexagon.xyz/medias/Logo%20Khoi%20C.png",

        alt: "Amazon",
      },

      {
        image:
          "https://webdemo.hexagon.xyz/medias/Happy%20Food.png",

        alt: "Google",
      },

      {
        image:
          "https://webdemo.hexagon.xyz/medias/B.png",

        alt: "Microsoft",
      },

      {
        image:
          "https://webdemo.hexagon.xyz/medias/Logo%20Khoi%20F.png",

        alt: "Apple",
      },
    ],
  },

  render: (props) => (
    <LogoSlider {...props} />
  ),
},
AboutOrganization: {
fields: {
// =====================
// SECTION
// =====================
sectionHeight: {
type: "number",
label: "Section Height",
group: "Section",
},

// =====================
// BACKGROUND
// =====================
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
      label: "Image / Gif",
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
// OVERLAY
// =====================
overlayEnable: {
  type: "radio",
  label: "Overlay",
  group: "Overlay",

  options: [
    {
      label: "Bật",
      value: true,
    },
    {
      label: "Tắt",
      value: false,
    },
  ],
},

overlayFrom: {
  type: "text",
  group: "Overlay",
},

overlayTo: {
  type: "text",
  group: "Overlay",
},

overlayDirection: {
  type: "text",
  group: "Overlay",
},

overlayOpacity: {
  type: "number",
  group: "Overlay",
},

// =====================
// BLOCKS
// =====================
blocks: {
  type: "array",
  label: "Blocks",
  group: "Blocks",

  getItemSummary: (item) =>
    item?.title || "Block",

  arrayFields: {
    // POSITION
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
    },

    height: {
      type: "number",
    },

    padding: {
      type: "number",
    },

    // BACKGROUND
    background: {
      type: "text",
    },

    shadow: {
      type: "text",
    },

    // BORDER
    borderWidth: {
      type: "number",
    },

    borderColor: {
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
    // TITLE
    title: {
      type: "text",
    },

    titleColor: {
      type: "text",
    },

    titleSize: {
      type: "number",
    },

    titleWeight: {
      type: "number",
    },

    // DESCRIPTION
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

    // MEMBERS GAP
    gap: {
      type: "number",
    },

    // =====================
    // MEMBERS
    // =====================
    members: {
      type: "array",

      getItemSummary: (item) =>
        item?.name || "Member",

      arrayFields: {
        avatar: {
          type: "text",
        },

        avatarSize: {
          type: "number",
        },

        avatarRadius: {
          type: "number",
        },

        name: {
          type: "text",
        },

        nameColor: {
          type: "text",
        },

        nameSize: {
          type: "number",
        },

        clubRole: {
          type: "text",
        },

        businessRole: {
          type: "text",
        },

        company: {
          type: "text",
        },

        roleColor: {
          type: "text",
        },

        // CARD
        background: {
          type: "text",
        },

        cardPadding: {
          type: "number",
        },

        cardRadius: {
          type: "number",
        },

        shadow: {
          type: "text",
        },

        // HOVER
        hoverScale: {
          type: "number",
        },

        hoverTranslateY: {
          type: "number",
        },

        hoverShadow: {
          type: "text",
        },
      },
    },
  },
},

},

defaultProps: {
sectionHeight: 800,

backgroundType: "gradient",

backgroundColor: "#ffffff",

gradientFrom: "#DDF6FF",

gradientTo: "#F7E4FF",

backgroundImage: "",

overlayEnable: false,

overlayFrom: "rgba(0,87,255,.15)",

overlayTo: "rgba(255,255,255,0)",

overlayDirection: "135deg",

overlayOpacity: 100,

blocks: [
  {
    x: 15,
    y: 80,

    width: 755,
    height: 640,

    padding: 40,

    background: "#ffffff",

    shadow:
      "0 15px 40px rgba(0,0,0,.08)",

    borderWidth: 1,

    borderColor: "#DDEFFF",

    radiusTL: 1,
    radiusTR: 20,
    radiusBL: 1,
    radiusBR: 20,

    title: "VỀ CÂU LẠC BỘ",

    titleColor: "#00589C",

    titleSize: 20,

    titleWeight: 500,

    description:
      "Giới thiệu về câu lạc bộ doanh nhân Đồng Tháp tại TP.HCM.",

    descriptionColor: "#163C6B",

    descriptionSize: 18,

    textAlign: "left",

    gap: 20,

    members: [],
  },

  {
    x: 815,
    y: 80,

    width: 755,
    height: 640,

    padding: 40,

    background: "#ffffff",

    shadow:
      "0 15px 40px rgba(0,0,0,.08)",

    borderWidth: 1,

    borderColor: "#DDEFFF",

    radiusTL: 20,
    radiusTR: 1,
    radiusBL: 20,
    radiusBR: 1,

    title: "CƠ CẤU TỔ CHỨC",

    titleColor: "#00589C",

    titleSize: 20,

    titleWeight: 500,

    description: "",

    descriptionColor: "#163C6B",

    descriptionSize: 18,

    gap: 20,

    members: [
      {
        avatar:
          "https://i.pravatar.cc/150?img=1",

        avatarSize: 110,

        avatarRadius: 999,

        name: "Nguyễn Văn A",

        nameColor: "#173B69",

        nameSize: 18,

        clubRole: "Chủ tịch",

        businessRole: "CEO",

        company: "ABC Group",

        roleColor: "#173B69",

        background: "#ffffff",

        cardPadding: 20,

        cardRadius: 24,

        shadow:
          "0 8px 25px rgba(0,0,0,.06)",

        hoverScale: 1.03,

        hoverTranslateY: -8,

        hoverShadow:
          "0 20px 40px rgba(0,0,0,.15)",
      },
    ],
  },
],
},

render: (props) => (
<AboutOrganization {...props} />
),
},

  },
};

export default config;