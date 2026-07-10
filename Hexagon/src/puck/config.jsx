import Header from "./components/Header";
import Banner from "./components/Banner";
export const config = {
  components: {
    Header: {
      label: "Header",

      fields: {
     

        logo: {
          type: "text",
          label: "Logo URL",
        },

        logoText: {
          type: "text",
          label: "Logo Text",
        },

        logoLink: {
          type: "text",
          label: "Logo Link",
        },

        logoWidth: {
          type: "number",
          label: "Logo Width",
        },

        logoHeight: {
          type: "number",
          label: "Logo Height",
        },

        /* Layout */

        headerHeight: {
          type: "number",
          label: "Header Height",
        },

        containerWidth: {
          type: "select",
          label: "Container Width",

          options: [
            {
              label: "Full",
              value: "full",
            },
            {
              label: "1200px",
              value: "1200px",
            },
            {
              label: "1400px",
              value: "1400px",
            },
          ],
        },

        paddingX: {
          type: "number",
          label: "Padding X",
        },

        sticky: {
          type: "radio",
          label: "Sticky",

          options: [
            {
              label: "Off",
              value: false,
            },
            {
              label: "On",
              value: true,
            },
          ],
        },

        shadow: {
          type: "radio",
          label: "Shadow",

          options: [
            {
              label: "Off",
              value: false,
            },
            {
              label: "On",
              value: true,
            },
          ],
        },

        borderBottom: {
          type: "radio",
          label: "Border Bottom",

          options: [
            {
              label: "Off",
              value: false,
            },
            {
              label: "On",
              value: true,
            },
          ],
        },

        /* Background */

        backgroundColor: {
          type: "text",
          label: "Background",
        },

        textColor: {
          type: "text",
          label: "Text Color",
        },

        hoverColor: {
          type: "text",
          label: "Hover Color",
        },

        /* Menu */

        menuFontSize: {
          type: "number",
          label: "Menu Font Size",
        },

        menuFontWeight: {
          type: "number",
          label: "Menu Font Weight",
        },

        menuGap: {
          type: "number",
          label: "Menu Gap",
        },

        menu: {
          type: "array",

          getItemSummary(item) {
            return item.label || "Menu";
          },

          defaultItemProps: {
            label: "Menu",
            link: "#",
            newTab: false,
          },

          arrayFields: {
            label: {
              type: "text",
              label: "Text",
            },

            link: {
              type: "text",
              label: "Link",
            },

            newTab: {
              type: "radio",
              label: "New Tab",

              options: [
                {
                  label: "No",
                  value: false,
                },
                {
                  label: "Yes",
                  value: true,
                },
              ],
            },
          },
        },

        buttonText: {
          type: "text",
          label: "Button Text",
        },

        buttonLink: {
          type: "text",
          label: "Button Link",
        },

        buttonColor: {
          type: "text",
          label: "Button Background",
        },

        buttonTextColor: {
          type: "text",
          label: "Button Text Color",
        },

        /* Language */
/* Language */

showLanguage: {
  type: "radio",
  label: "Show Language",
  options: [
    {
      label: "Off",
      value: false,
    },
    {
      label: "On",
      value: true,
    },
  ],
},

defaultLanguage: {
  type: "select",
  label: "Default Language",
  options: [
    {
      label: "Vietnamese",
      value: "vi",
    },
    {
      label: "English",
      value: "en",
    },
  ],
},
      },

      defaultProps: {
        logo: "https://beta.hexagon.xyz/assets/images/logo-hhc.png",

        logoText: "HEXAGON",

        logoLink: "/",

        logoWidth: 56,

        logoHeight: 56,

        headerHeight: 90,

        containerWidth: "1400px",

        paddingX: 32,

        sticky: false,

        shadow: false,

        borderBottom: false,

        backgroundColor: "#257447",

        textColor: "#ffffff",

        hoverColor: "#d1fae5",

        menuFontSize: 18,

        menuFontWeight: 500,

        menuGap: 40,

        menu: [
          {
            label: "Trang chủ",
            link: "#",
          },
          {
            label: "Giới thiệu",
            link: "#",
          },
          {
            label: "Dịch vụ",
            link: "#",
          },
          {
            label: "Hỗ trợ",
            link: "#",
          },
          {
            label: "Liên hệ",
            link: "#",
          },
        ],
        showLanguage: true,

defaultLanguage: "vi",
      },

      render: Header,
    },
    Banner: {
      fields: {
        /* -------------------- CONTENT -------------------- */

        badge: {
          type: "text",
          label: "Badge",
        },

        showBadge: {
          type: "radio",
          label: "Hiển thị Badge",
          options: [
            { label: "Hiện", value: true },
            { label: "Ẩn", value: false },
          ],
        },

        title: {
          type: "text",
          label: "Tiêu đề",
        },

        highlight: {
          type: "text",
          label: "Highlight",
        },

        description: {
          type: "textarea",
          label: "Mô tả",
        },

        /* -------------------- IMAGE -------------------- */

        image: {
          type: "text",
          label: "Link ảnh / GIF",
        },

        imageAlt: {
          type: "text",
          label: "Alt",
        },

        imageWidth: {
          type: "number",
          label: "Chiều rộng ảnh",
        },

        imageHeight: {
          type: "number",
          label: "Chiều cao ảnh",
        },

        imageRadius: {
          type: "number",
          label: "Bo góc ảnh",
        },

        imageShadow: {
          type: "radio",
          label: "Shadow",
          options: [
            { label: "Có", value: true },
            { label: "Không", value: false },
          ],
        },

        /* -------------------- BUTTON 1 -------------------- */

        button1Text: {
          type: "text",
          label: "Text Button 1",
        },

        button1Link: {
          type: "text",
          label: "Link Button 1",
        },

        button1Color: {
          type: "text",
          label: "Background Button 1",
        },

        button1TextColor: {
          type: "text",
          label: "Text Button 1",
        },

        /* -------------------- BUTTON 2 -------------------- */

        showButton2: {
          type: "radio",
          label: "Hiện Button 2",
          options: [
            { label: "Hiện", value: true },
            { label: "Ẩn", value: false },
          ],
        },

        button2Text: {
          type: "text",
          label: "Text Button 2",
        },

        button2Link: {
          type: "text",
          label: "Link Button 2",
        },

        button2Color: {
          type: "text",
          label: "Background Button 2",
        },

        button2TextColor: {
          type: "text",
          label: "Text Button 2",
        },

        /* -------------------- TYPOGRAPHY -------------------- */

        badgeSize: {
          type: "number",
          label: "Badge Size",
        },

        titleSize: {
          type: "number",
          label: "Title Size",
        },

        titleWeight: {
          type: "number",
          label: "Title Weight",
        },

        titleLineHeight: {
          type: "number",
          label: "Title Line Height",
        },

        highlightSize: {
          type: "number",
          label: "Highlight Size",
        },

        highlightWeight: {
          type: "number",
          label: "Highlight Weight",
        },

        descriptionSize: {
          type: "number",
          label: "Description Size",
        },

        descriptionLineHeight: {
          type: "number",
          label: "Description Line Height",
        },

        buttonSize: {
          type: "number",
          label: "Button Size",
        },

        scrollTextSize: {
          type: "number",
          label: "Scroll Text Size",
        },

        /* -------------------- COLOR -------------------- */
        backgroundType: {
          type: "select",
          label: "Background Type",
          options: [
            { label: "Color", value: "color" },
            { label: "Gradient", value: "gradient" },
            { label: "Image", value: "image" },
            { label: "Image + Color", value: "image+color" },
            { label: "Image + Gradient", value: "image+gradient" },
          ],
        },
        backgroundColor: {
          type: "text",
          label: "Background Color",
        },

        backgroundImage: {
          type: "text",
          label: "Background Image",
        },
        gradientColor1: {
          type: "text",
          label: "Gradient Color 1",
        },
        gradientColor2: {
          type: "text",
          label: "Gradient Color 2",
        },
        gradientDirection: {
          type: "select",
          label: "Gradient Direction",
          options: [
            { label: "Left → Right", value: "to right" },
            { label: "Right → Left", value: "to left" },
            { label: "Top → Bottom", value: "to bottom" },
            { label: "Top Left → Bottom Right", value: "to bottom right" },
            { label: "Top Right → Bottom Left", value: "to bottom left" },
          ],
        },
        overlayColor: {
          type: "text",
          label: "Overlay Color",
        },
        overlayOpacity: {
          type: "number",
          label: "Overlay Opacity (0-1)",
        },
        titleColor: {
          type: "text",
          label: "Title Color",
        },

        highlightColor: {
          type: "text",
          label: "Highlight Color",
        },

        textColor: {
          type: "text",
          label: "Description Color",
        },

        badgeColor: {
          type: "text",
          label: "Badge Color",
        },

        badgeBackground: {
          type: "text",
          label: "Badge Background",
        },

        /* -------------------- LAYOUT -------------------- */

        contentWidth: {
          type: "number",
          label: "Content Width",
        },

        height: {
          type: "number",
          label: "Section Height",
        },

        reverse: {
          type: "radio",
          label: "Đảo Layout",
          options: [
            { label: "Image Right", value: false },
            { label: "Image Left", value: true },
          ],
        },

        paddingTop: {
          type: "number",
          label: "Padding Top",
        },

        paddingBottom: {
          type: "number",
          label: "Padding Bottom",
        },

        /* -------------------- SCROLL -------------------- */

        showScroll: {
          type: "radio",
          label: "Hiện Scroll",
          options: [
            { label: "Hiện", value: true },
            { label: "Ẩn", value: false },
          ],
        },

        scrollText: {
          type: "text",
          label: "Scroll Text",
        },
      },

      defaultProps: {
        badge: "CÔNG NGHỆ TƯƠNG LAI",
        showBadge: true,

        title: "Cung cấp thiết",

        highlight: "HEXAGON Solutions",

        description:
          "HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp internet, thiết bị CNTT.",

        image: "https://metik.vn/wp-content/uploads/2026/06/globalmyc.webp",

        imageAlt: "Banner",

        imageWidth: 655,
        imageHeight: 400,
        imageRadius: 0,
        imageShadow: false,

        button1Text: "Khám phá Dịch vụ",
        button1Link: "#",
        button1Color: "#F7A600",
        button1TextColor: "#FFFFFF",

        showButton2: true,
        button2Text: "Liên hệ Tư vấn",
        button2Link: "#",
        button2Color: "transparent",
        button2TextColor: "#FFFFFF",

        badgeSize: 13,

        titleSize: 55,
        titleWeight: 800,
        titleLineHeight: 1.1,

        highlightSize: 28,
        highlightWeight: 800,

        descriptionSize: 16,
        descriptionLineHeight: 1.8,

        buttonSize: 11,

        scrollTextSize: 10,

        backgroundType: "gradient",

        backgroundColor: "#156C45",

        backgroundImage: "",

        gradientColor1: "#156C45",

        gradientColor2: "#35B86B",

        gradientDirection: "to right",

        overlayColor: "#000000",

        overlayOpacity: 0,
        titleColor: "#FFFFFF",
        highlightColor: "#F7B63F",
        textColor: "#FFFFFF",

        badgeColor: "#FDBA12",
        badgeBackground: "transparent",

        contentWidth: 620,

        height: 800,

        reverse: false,

        paddingTop: 140,
        paddingBottom: 40,

        showScroll: true,
        scrollText: "Cuộn xuống để khám phá",
      },

      render: Banner,
    },
  },
};
