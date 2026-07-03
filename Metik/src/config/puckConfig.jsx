import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";


export const config = {
  components: {
    Header: {

      label: "Header",

      defaultProps: {

        header: {
          height: 100,
          maxWidth: 1400,
          background: "#ffffff",

          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 40,
          paddingRight: 40,

          sticky: false,
          shadow: false,
          borderBottom: true,

          logoWidth: 240,
          socialWidth: 180
        },

        logo: {
          image: "https://metik.vn/wp-content/uploads/2026/06/logometik.png.webp",
          link: "/",

          width: 220,
          height: 70,

          positionX: 0,
          positionY: 0,

          borderWidth: 0,
          borderColor: "#dddddd",
          borderRadius: 0
        },

        menu: {
          fontSize: 16,
          fontWeight: 600,

          color: "#333333",
          hoverColor: "#f28c28",
          activeColor: "#f28c28",

          gap: 35,

          uppercase: true,
          letterSpacing: 0,

          positionX: 0,
          positionY: 0
        },

        menus: [
          {
            title: "TRANG CHỦ",
            url: "/",
            active: false
          },
          {
            title: "GIỚI THIỆU",
            url: "/gioi-thieu",
            active: false
          },
          {
            title: "SẢN PHẨM",
            url: "/san-pham",
            active: false
          },
          {
            title: "LIÊN HỆ",
            url: "/lien-he",
            active: false
          }
        ],

        social: {
          gap: 12,
          positionX: 0,
          positionY: 0
        },

        socials: [
          {
            icon: "facebook",
            url: "#",

            size: 40,
            iconSize: 18,

            background: "#1877F2",
            hoverBackground: "#145dbf",

            color: "#ffffff",
            hoverColor: "#ffffff",

            borderWidth: 0,
            borderColor: "#dddddd",

            radius: "50%",

            positionX: 0,
            positionY: 0,

            scale: 1,
            hoverScale: 1.1
          },

          {
            icon: "tiktok",
            url: "#",

            size: 40,
            iconSize: 18,

            background: "#000000",
            hoverBackground: "#222222",

            color: "#ffffff",
            hoverColor: "#ffffff",

            borderWidth: 0,
            borderColor: "#dddddd",

            radius: "50%",

            positionX: 0,
            positionY: 0,

            scale: 1,
            hoverScale: 1.1
          },

          {
            icon: "linkedin",
            url: "#",

            size: 40,
            iconSize: 18,

            background: "#0A66C2",
            hoverBackground: "#084d94",

            color: "#ffffff",
            hoverColor: "#ffffff",

            borderWidth: 0,
            borderColor: "#dddddd",

            radius: "50%",

            positionX: 0,
            positionY: 0,

            scale: 1,
            hoverScale: 1.1
          }
        ]
      },

      fields: {

        /* ================= HEADER ================= */

        header: {
          type: "object",
          objectFields: {

            height: {
              type: "number",
              label: "Height"
            },

            maxWidth: {
              type: "number",
              label: "Max Width"
            },

            background: {
              type: "text",
              label: "Background"
            },

            paddingTop: {
              type: "number",
              label: "Padding Top"
            },

            paddingBottom: {
              type: "number",
              label: "Padding Bottom"
            },

            paddingLeft: {
              type: "number",
              label: "Padding Left"
            },

            paddingRight: {
              type: "number",
              label: "Padding Right"
            },

            sticky: {
              type: "radio",
              label: "Sticky",
              options: [
                { label: "True", value: true },
                { label: "False", value: false }
              ]
            },

            shadow: {
              type: "radio",
              label: "Shadow",
              options: [
                { label: "True", value: true },
                { label: "False", value: false }
              ]
            },

            borderBottom: {
              type: "radio",
              label: "Border Bottom",
              options: [
                { label: "True", value: true },
                { label: "False", value: false }
              ]
            },

            logoWidth: {
              type: "number",
              label: "Logo Column"
            },

            socialWidth: {
              type: "number",
              label: "Social Column"
            }

          }
        },

        /* ================= LOGO ================= */

        logo: {
          type: "object",
          objectFields: {

            image: {
              type: "text",
              label: "Logo URL"
            },

            width: {
              type: "number", 
              label: "Width"
            },

            height: {
              type: "number",
              label: "Height"
            },

            positionX: {
              type: "number",
              label: "Move X"
            },

            positionY: {
              type: "number",
              label: "Move Y"
            },

            borderWidth: {
              type: "number",
              label: "Border Width"
            },

            borderColor: {
              type: "text",
              label: "Border Color"
            },

            borderRadius: {
              type: "number",
              label: "Radius"
            }

          }
        },

        /* ================= MENU ================= */

        menu: {
          type: "object",
          objectFields: {

            fontSize: {
              type: "number",
              label: "Font Size"
            },

            fontWeight: {
              type: "number",
              label: "Font Weight"
            },

            color: {
              type: "text",
              label: "Color"
            },

            hoverColor: {
              type: "text",
              label: "Hover Color"
            },

            activeColor: {
              type: "text",
              label: "Active Color"
            },

            gap: {
              type: "number",
              label: "Gap"
            },

            uppercase: {
              type: "radio",
              label: "Uppercase",
              options: [
                { label: "True", value: true },
                { label: "False", value: false }
              ]
            },

            letterSpacing: {
              type: "number",
              label: "Letter Spacing"
            },

            positionX: {
              type: "number",
              label: "Move X"
            },

            positionY: {
              type: "number",
              label: "Move Y"
            }

          }
        },

        menus: {
          type: "array",
          label: "Menu Items",

          arrayFields: {

            title: {
              type: "text",
              label: "Title"
            },

            url: {
              type: "text",
              label: "URL"
            },

            active: {
              type: "radio",
              label: "Active",
              options: [
                { label: "True", value: true },
                { label: "False", value: false }
              ]
            }

          }
        },

        /* ================= SOCIAL ================= */

        social: {
          type: "object",
          objectFields: {

            gap: {
              type: "number",
              label: "Gap"
            },

            positionX: {
              type: "number",
              label: "Move X"
            },

            positionY: {
              type: "number",
              label: "Move Y"
            }

          }
        },

        socials: {
          type: "array",
          label: "Social Icons",

          arrayFields: {

            icon: {
              type: "select",
              label: "Icon",
              options: [
                { label: "Facebook", value: "facebook" },
                { label: "TikTok", value: "tiktok" },
                { label: "LinkedIn", value: "linkedin" }
              ]
            },

            url: {
              type: "text",
              label: "URL"
            },

            size: {
              type: "number",
              label: "Size"
            },

            iconSize: {
              type: "number",
              label: "Icon Size"
            },

            background: {
              type: "text",
              label: "Background"
            },

            hoverBackground: {
              type: "text",
              label: "Hover Background"
            },

            color: {
              type: "text",
              label: "Color"
            },

            hoverColor: {
              type: "text",
              label: "Hover Color"
            },

            borderWidth: {
              type: "number",
              label: "Border Width"
            },

            borderColor: {
              type: "text",
              label: "Border Color"
            },

            radius: {
              type: "text",
              label: "Radius"
            },

            positionX: {
              type: "number",
              label: "Move X"
            },

            positionY: {
              type: "number",
              label: "Move Y"
            },

            scale: {
              type: "number",
              label: "Scale"
            },

            hoverScale: {
              type: "number",
              label: "Hover Scale"
            }

          }
        }

      },

      render: (props) => <Header {...props} />

    },
    Hero:{

fields:{

heading:{
type:"text"
},

subHeading:{
type:"text"
}

},

render:({heading,subHeading})=>(

<Hero

heading={heading}

subHeading={subHeading}

/>

)

},
  },
};