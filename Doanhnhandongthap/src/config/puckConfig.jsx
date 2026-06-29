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
    sectionHeight: 250,

    backgroundType: "color",
    backgroundColor: "#F7E4FF",

    gradientFrom: "#DDF6FF",
    gradientTo: "#F7E4FF",

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

backgroundColor: "#F7E4FF",

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

    titleSize: 25,

    titleWeight: 700,

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

    titleSize: 25,

    titleWeight: 700,

    description: "Các Bộ Phận Chuyên Trách Để hiện thực hóa các mục tiêu hỗ trợ doanh nghiệp, cơ cấu tổ chức của Hội được chia thành các ban chuyên môn và mạng lưới trực thuộc:",

    descriptionColor: "#163C6B",

    descriptionSize: 18,

    gap: 20,

    members: [
      {
        avatar:
          "data:image/jpeg;base64,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",

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