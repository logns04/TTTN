import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import ProductSection from "../components/ProductSection/ProductSection";
import AboutSection from "../components/AboutSection/AboutSection";
import AboutUsSection from "../components/AboutUsSection/AboutUsSection";
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
          socialWidth: 180,
        },

        logo: {
          image:
            "https://metik.vn/wp-content/uploads/2026/06/logometik.png.webp",
          link: "/",

          width: 220,
          height: 70,

          positionX: 0,
          positionY: 0,

          borderWidth: 0,
          borderColor: "#dddddd",
          borderRadius: 0,
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
          positionY: 0,
        },

        menus: [
          {
            title: "TRANG CHỦ",
            url: "/",
            active: false,
          },
          {
            title: "GIỚI THIỆU",
            url: "/gioi-thieu",
            active: false,
          },
          {
            title: "SẢN PHẨM",
            url: "/san-pham",
            active: false,
          },
          {
            title: "LIÊN HỆ",
            url: "/lien-he",
            active: false,
          },
        ],

        social: {
          gap: 12,
          positionX: 0,
          positionY: 0,
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
            hoverScale: 1.1,
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
            hoverScale: 1.1,
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
            hoverScale: 1.1,
          },
        ],
      },

      fields: {
        /* ================= HEADER ================= */

        header: {
          type: "object",
          objectFields: {
            height: {
              type: "number",
              label: "Height",
            },

            maxWidth: {
              type: "number",
              label: "Max Width",
            },

            background: {
              type: "text",
              label: "Background",
            },

            paddingTop: {
              type: "number",
              label: "Padding Top",
            },

            paddingBottom: {
              type: "number",
              label: "Padding Bottom",
            },

            paddingLeft: {
              type: "number",
              label: "Padding Left",
            },

            paddingRight: {
              type: "number",
              label: "Padding Right",
            },

            sticky: {
              type: "radio",
              label: "Sticky",
              options: [
                { label: "True", value: true },
                { label: "False", value: false },
              ],
            },

            shadow: {
              type: "radio",
              label: "Shadow",
              options: [
                { label: "True", value: true },
                { label: "False", value: false },
              ],
            },

            borderBottom: {
              type: "radio",
              label: "Border Bottom",
              options: [
                { label: "True", value: true },
                { label: "False", value: false },
              ],
            },

            logoWidth: {
              type: "number",
              label: "Logo Column",
            },

            socialWidth: {
              type: "number",
              label: "Social Column",
            },
          },
        },

        /* ================= LOGO ================= */

        logo: {
          type: "object",
          objectFields: {
            image: {
              type: "text",
              label: "Logo URL",
            },

            width: {
              type: "number",
              label: "Width",
            },

            height: {
              type: "number",
              label: "Height",
            },

            positionX: {
              type: "number",
              label: "Move X",
            },

            positionY: {
              type: "number",
              label: "Move Y",
            },

            borderWidth: {
              type: "number",
              label: "Border Width",
            },

            borderColor: {
              type: "text",
              label: "Border Color",
            },

            borderRadius: {
              type: "number",
              label: "Radius",
            },
          },
        },

        /* ================= MENU ================= */

        menu: {
          type: "object",
          objectFields: {
            fontSize: {
              type: "number",
              label: "Font Size",
            },

            fontWeight: {
              type: "number",
              label: "Font Weight",
            },

            color: {
              type: "text",
              label: "Color",
            },

            hoverColor: {
              type: "text",
              label: "Hover Color",
            },

            activeColor: {
              type: "text",
              label: "Active Color",
            },

            gap: {
              type: "number",
              label: "Gap",
            },

            uppercase: {
              type: "radio",
              label: "Uppercase",
              options: [
                { label: "True", value: true },
                { label: "False", value: false },
              ],
            },

            letterSpacing: {
              type: "number",
              label: "Letter Spacing",
            },

            positionX: {
              type: "number",
              label: "Move X",
            },

            positionY: {
              type: "number",
              label: "Move Y",
            },
          },
        },

        menus: {
          type: "array",
          label: "Menu Items",

          arrayFields: {
            title: {
              type: "text",
              label: "Title",
            },

            url: {
              type: "text",
              label: "URL",
            },

            active: {
              type: "radio",
              label: "Active",
              options: [
                { label: "True", value: true },
                { label: "False", value: false },
              ],
            },
          },
        },

        /* ================= SOCIAL ================= */

        social: {
          type: "object",
          objectFields: {
            gap: {
              type: "number",
              label: "Gap",
            },

            positionX: {
              type: "number",
              label: "Move X",
            },

            positionY: {
              type: "number",
              label: "Move Y",
            },
          },
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
                { label: "LinkedIn", value: "linkedin" },
              ],
            },

            url: {
              type: "text",
              label: "URL",
            },

            size: {
              type: "number",
              label: "Size",
            },

            iconSize: {
              type: "number",
              label: "Icon Size",
            },

            background: {
              type: "text",
              label: "Background",
            },

            hoverBackground: {
              type: "text",
              label: "Hover Background",
            },

            color: {
              type: "text",
              label: "Color",
            },

            hoverColor: {
              type: "text",
              label: "Hover Color",
            },

            borderWidth: {
              type: "number",
              label: "Border Width",
            },

            borderColor: {
              type: "text",
              label: "Border Color",
            },

            radius: {
              type: "text",
              label: "Radius",
            },

            positionX: {
              type: "number",
              label: "Move X",
            },

            positionY: {
              type: "number",
              label: "Move Y",
            },

            scale: {
              type: "number",
              label: "Scale",
            },

            hoverScale: {
              type: "number",
              label: "Hover Scale",
            },
          },
        },
      },

      render: (props) => <Header {...props} />,
    },

    Hero: {
      label: "Hero",
      defaultProps: {
        banner: {
          height: 500,
          background: "#ffffff",
          borderRadius: 0,
          shadow: false,
          autoplay: true,
          interval: 3000,
          showArrow: true,
          showDot: true,
          overlay: false,
          overlayColor: "rgba(0,0,0,.25)",
          objectFit: "cover",
          objectPosition: "center",
        },
        slides: [
          {
            image:
              "https://metik.vn/wp-content/uploads/2026/06/thumbnailmetik.webp",
            alt: "Banner 1",
            link: "",
            target: "_self",
            objectFit: "cover",
            objectPosition: "center",
          },
          {
            image:
              "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474087ooF/hinh-anh-sale-dep-thu-hut-banner-sale-bat-mat_083454887.jpg",
            alt: "Banner 2",
            link: "",
            target: "_self",
            objectFit: "cover",
            objectPosition: "center",
          },
        ],
        arrow: {
          size: 50,
          iconSize: 22,
          color: "#ffffff",
          background: "rgba(255,255,255,.25)",
          hoverBackground: "#F28C28",
          hoverColor: "#ffffff",
          radius: "50%",
          offset: 30,
        },
        dot: {
          size: 12,
          activeSize: 14,
          color: "#ffffff",
          activeColor: "#F28C28",
          gap: 10,
          bottom: 25,
        },
      },

      fields: {
        banner: {
          type: "object",
          objectFields: {
            height: { type: "number", label: "Height" },
            background: { type: "text", label: "Background" },
            borderRadius: { type: "number", label: "Border Radius" },
            shadow: {
              type: "radio",
              label: "Shadow",
              options: [
                { label: "True", value: true },
                { label: "False", value: false },
              ],
            },

            autoplay: {
              type: "radio",
              label: "Autoplay",
              options: [
                { label: "True", value: true },
                { label: "False", value: false },
              ],
            },
            showArrow: {
              type: "radio",
              label: "Show Arrow",
              options: [
                { label: "True", value: true },
                { label: "False", value: false },
              ],
            },
            showDot: {
              type: "radio",
              label: "Show Dot",
              options: [
                { label: "True", value: true },
                { label: "False", value: false },
              ],
            },
            overlay: {
              type: "radio",
              label: "Overlay",
              options: [
                { label: "True", value: true },
                { label: "False", value: false },
              ],
            },
            overlayColor: { type: "text", label: "Overlay Color" },
            objectFit: {
              type: "select",
              label: "Object Fit",
              options: [
                { label: "Cover", value: "cover" },
                { label: "Contain", value: "contain" },
                { label: "Fill", value: "fill" },
              ],
            },

            objectPosition: { type: "text", label: "Object Position" },
          },
        },

        slides: {
          type: "array",
          label: "Slides",

          arrayFields: {
            image: {
              type: "custom",
              label: "Image",
              render: ({ value, onChange }) => (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {value && (
                    <img
                      src={value}
                      alt=""
                      style={{
                        width: "100%",
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #ddd",
                      }}
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (!file) return;

                      const reader = new FileReader();

                      reader.onload = () => {
                        onChange(reader.result);
                      };

                      reader.readAsDataURL(file);
                    }}
                  />
                </div>
              ),
            },

            alt: {
              type: "text",
              label: "Alt",
            },

            link: {
              type: "text",
              label: "Link",
            },

            target: {
              type: "select",
              label: "Target",
              options: [
                { label: "Same Tab", value: "_self" },
                { label: "New Tab", value: "_blank" },
              ],
            },

            objectFit: {
              type: "select",
              label: "Object Fit",
              options: [
                { label: "Cover", value: "cover" },
                { label: "Contain", value: "contain" },
              ],
            },

            objectPosition: {
              type: "text",
              label: "Object Position",
            },
          },
        },

        arrow: {
          type: "object",
          objectFields: {
            size: { type: "number", label: "Button Size" },

            iconSize: { type: "number", label: "Icon Size" },

            color: { type: "text", label: "Icon Color" },

            background: { type: "text", label: "Background" },

            hoverBackground: { type: "text", label: "Hover Background" },

            hoverColor: { type: "text", label: "Hover Color" },

            radius: { type: "text", label: "Radius" },

            offset: { type: "number", label: "Offset" },
          },
        },

        dot: {
          type: "object",
          objectFields: {
            size: { type: "number", label: "Size" },

            activeSize: { type: "number", label: "Active Size" },

            color: { type: "text", label: "Color" },

            activeColor: { type: "text", label: "Active Color" },

            gap: { type: "number", label: "Gap" },

            bottom: { type: "number", label: "Bottom" },
          },
        },
      },
      render: (props) => <Hero {...props} />,
    },

    ProductSection: {
      label: "Product Section",

      defaultProps: {
        section: {
          width: 1250,
          height: 500,
          background: "#ffffff",
          paddingTop: 27,
          paddingBottom: 58,
          paddingLeft: 20,
          paddingRight: 20,
        },

        title: {
          text: "SẢN PHẨM MỚI",
          fontSize: 28,
          fontWeight: 700,
          color: "#43A047",
          align: "left",
          marginBottom: 40,
          lineWidth: 180,
          lineHeight: 8,
          lineColor: "#FFC107",
          positionX: 0,
          positionY: 0,
        },

        card: {
          columns: 4,
          gap: 35,
          imageHeight: 255,
          radius: 0,
          border: "1px solid #e5e5e5",
          background: "#ffffff",
          shadow: "0 3px 10px rgba(0,0,0,.08)",
          hoverScale: 1.04,
          hoverShadow: "0 10px 25px rgba(0,0,0,.18)",
          nameSize: 20,
          nameWeight: 700,
          nameColor: "#F28C28",
          hoverColor: "#43A047",
          padding: 22,
        },

        products: [
          {
            image: "/src/assets/sp1.png",
            name: "Snack vị Táo biển",
            link: "",
            objectFit: "cover",
          },
          {
            image: "/src/assets/sp1.png",
            name: "Snack vị BBQ",
            link: "#",
            objectFit: "cover",
          },
          {
            image: "/src/assets/sp1.png",
            name: "Snack vị Bắp",
            link: "#",
            objectFit: "cover",
          },
          {
            image: "/src/assets/sp1.png",
            name: "Snack vị Phô mai",
            link: "#",
            objectFit: "cover",
          },
        ],
      },

      fields: {
        section: {
          type: "object",
          objectFields: {
            height: {
              type: "number",
              label: "Height",
            },

            width: {
              type: "number",
              label: "Width",
            },
            background: {
              type: "text",
              label: "Background",
            },

            paddingTop: {
              type: "number",
              label: "Padding Top",
            },

            paddingBottom: {
              type: "number",
              label: "Padding Bottom",
            },

            paddingLeft: {
              type: "number",
              label: "Padding Left",
            },

            paddingRight: {
              type: "number",
              label: "Padding Right",
            },
          },
        },

        title: {
          type: "object",
          objectFields: {
            text: {
              type: "text",
              label: "Title",
            },

            fontSize: {
              type: "number",
              label: "Font Size",
            },

            fontWeight: {
              type: "number",
              label: "Font Weight",
            },

            color: {
              type: "text",
              label: "Color",
            },

            align: {
              type: "select",
              label: "Align",
              options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ],
            },

            marginBottom: {
              type: "number",
              label: "Margin Bottom",
            },

            lineWidth: {
              type: "number",
              label: "Line Width",
            },

            lineHeight: {
              type: "number",
              label: "Line Height",
            },

            lineColor: {
              type: "text",
              label: "Line Color",
            },

            positionX: {
              type: "number",
              label: "Move X",
            },

            positionY: {
              type: "number",
              label: "Move Y",
            },
          },
        },

        card: {
          type: "object",
          objectFields: {
            columns: {
              type: "number",
              label: "Columns",
            },

            gap: {
              type: "number",
              label: "Gap",
            },

            imageHeight: {
              type: "number",
              label: "Image Height",
            },

            radius: {
              type: "number",
              label: "Radius",
            },

            border: {
              type: "text",
              label: "Border",
            },

            background: {
              type: "text",
              label: "Background",
            },

            shadow: {
              type: "text",
              label: "Shadow",
            },

            hoverScale: {
              type: "number",
              label: "Hover Scale",
            },

            hoverShadow: {
              type: "text",
              label: "Hover Shadow",
            },

            nameSize: {
              type: "number",
              label: "Name Size",
            },

            nameWeight: {
              type: "number",
              label: "Name Weight",
            },

            nameColor: {
              type: "text",
              label: "Name Color",
            },

            hoverColor: {
              type: "text",
              label: "Hover Color",
            },

            padding: {
              type: "number",
              label: "Padding",
            },
          },
        },

        products: {
          type: "array",
          label: "Products",

          arrayFields: {
            image: {
              type: "custom",
              label: "Image",
              render: ({ value, onChange }) => (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {value && (
                    <img
                      src={value}
                      style={{
                        width: "100%",
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #ddd",
                      }}
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (!file) return;

                      const reader = new FileReader();

                      reader.onload = () => onChange(reader.result);

                      reader.readAsDataURL(file);
                    }}
                  />
                </div>
              ),
            },

            name: {
              type: "text",
              label: "Product Name",
            },

            link: {
              type: "text",
              label: "Link",
            },

            objectFit: {
              type: "select",
              label: "Object Fit",
              options: [
                { label: "Cover", value: "cover" },
                { label: "Contain", value: "contain" },
              ],
            },
          },
        },
      },

      render: (props) => <ProductSection {...props} />,
    },
    AboutSection: {
      label: "About Section",

      fields: {
        section: {
          type: "object",
          objectFields: {
            width: { type: "number", label: "Width" },
            height: { type: "number", label: "Height" },
            background: { type: "text", label: "Background" },
            paddingTop: { type: "number", label: "Padding Top" },
            paddingBottom: { type: "number", label: "Padding Bottom" },
            paddingLeft: { type: "number", label: "Padding Left" },
            paddingRight: { type: "number", label: "Padding Right" },
            gap: { type: "number", label: "Gap" },
          },
        },

        title: {
          type: "object",
          objectFields: {
            text: { type: "text", label: "Title" },
            fontSize: { type: "number", label: "Font Size" },
            fontWeight: { type: "number", label: "Font Weight" },
            color: { type: "text", label: "Color" },
            align: {
              type: "select",
              label: "Align",
              options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ],
            },
            subtitle: {
              type: "text",
              label: "Subtitle",
            },
            subtitleSize: {
              type: "number",
              label: "Subtitle Size",
            },

            subtitleWeight: {
              type: "number",
              label: "Subtitle Weight",
            },

            subtitleColor: {
              type: "text",
              label: "Subtitle Color",
            },

            subtitleWidth: {
              type: "number",
              label: "Subtitle Width",
            },

            subtitleMarginTop: {
              type: "number",
              label: "Subtitle Margin Top",
            },
            marginBottom: { type: "number", label: "Margin Bottom" },
            lineWidth: { type: "number", label: "Line Width" },
            lineHeight: { type: "number", label: "Line Height" },
            lineColor: { type: "text", label: "Line Color" },
            positionX: { type: "number", label: "Position X" },
            positionY: { type: "number", label: "Position Y" },
          },
        },

        blocks: {
          type: "array",
          label: "About Blocks",

          arrayFields: {
            image: {
              type: "custom",
              label: "Image",
              render: ({ value, onChange }) => (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {value && (
                    <img
                      src={value}
                      alt=""
                      style={{
                        width: "100%",
                        height: 140,
                        objectFit: "cover",
                        borderRadius: 8,
                        border: "1px solid #ddd",
                      }}
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (!file) return;

                      const reader = new FileReader();

                      reader.onload = () => onChange(reader.result);

                      reader.readAsDataURL(file);
                    }}
                  />
                </div>
              ),
            },

            title: {
              type: "text",
              label: "Title",
            },

            description: {
              type: "text",
              label: "Description",
            },

            reverse: {
              type: "select",
              label: "Image Position",
              options: [
                { label: "Left", value: false },
                { label: "Right", value: true },
              ],
            },

            imageHeight: {
              type: "number",
              label: "Image Height",
            },

            radius: {
              type: "number",
              label: "Radius",
            },

            objectFit: {
              type: "select",
              label: "Object Fit",
              options: [
                { label: "Cover", value: "cover" },
                { label: "Contain", value: "contain" },
                { label: "Fill", value: "fill" },
              ],
            },

            titleSize: {
              type: "number",
              label: "Title Size",
            },

            titleWeight: {
              type: "number",
              label: "Title Weight",
            },

            titleColor: {
              type: "text",
              label: "Title Color",
            },

            textSize: {
              type: "number",
              label: "Text Size",
            },

            textColor: {
              type: "text",
              label: "Text Color",
            },

            lineHeight: {
              type: "number",
              label: "Line Height",
            },

            animation: {
              type: "select",
              label: "Animation",
              options: [
                { label: "Fade Up", value: "fade-up" },
                { label: "Fade Down", value: "fade-down" },
                { label: "Fade Left", value: "fade-left" },
                { label: "Fade Right", value: "fade-right" },
                { label: "Zoom In", value: "zoom-in" },
                { label: "Zoom Out", value: "zoom-out" },
                { label: "Flip Left", value: "flip-left" },
                { label: "Flip Right", value: "flip-right" },
                { label: "None", value: "" },
              ],
            },
          },
        },
      },

      defaultProps: {
        section: {
          width: 1250,
          height: 550,
          background: "#fff",
          paddingTop: 17,
          paddingBottom:2,
          paddingLeft: 20,
          paddingRight: 20,
          gap: 80,
        },

        title: {
          text: "GIỚI THIỆU VỀ METIK",
          fontSize: 28,
          fontWeight: 700,
          color: "#45B649",
          align: "left",
          marginBottom: 60,
          lineWidth: 180,
          lineHeight: 8,
          lineColor: "#FFC107",
          subtitle:
            "Metik là đơn vị chuyên cung cấp giải pháp công nghệ và sản xuất hiện đại.",

          subtitleSize: 18,

          subtitleWeight: 400,

          subtitleColor: "#666666",

          subtitleWidth: 700,

          subtitleMarginTop: 20,
          positionX: 0,
          positionY: 0,
        },

        blocks: [
          {
            image: "/src/assets/sp1.png",
            title: "Đội ngũ nhân viên",
            description: "Lorem ipsum dolor sit amet.",
            reverse: false,
            imageHeight: 340,
            radius: 30,
            objectFit: "cover",
            titleSize: 34,
            titleWeight: 700,
            titleColor: "#222",
            textSize: 18,
            textColor: "#666",
            lineHeight: 1.8,
            animation: "fade-right",
          },
          {
            image: "/src/assets/sp1.png",
            title: "Nhà máy sản xuất",
            description: "Lorem ipsum dolor sit amet.",
            reverse: true,
            imageHeight: 340,
            radius: 30,
            objectFit: "cover",
            titleSize: 34,
            titleWeight: 700,
            titleColor: "#222",
            textSize: 18,
            textColor: "#666",
            lineHeight: 1.8,
            animation: "fade-left",
          },
        ],
      },

      render: (props) => <AboutSection {...props} />,
    },
    AboutUsSection: {
      label: "About Us",

      fields: {
        section: {
          type: "object",
          objectFields: {
            width: { type: "number", label: "Width" },
            height: { type: "number", label: "Height" },
            background: { type: "text", label: "Background" },
            paddingTop: { type: "number", label: "Padding Top" },
            paddingBottom: { type: "number", label: "Padding Bottom" },
            paddingLeft: { type: "number", label: "Padding Left" },
            paddingRight: { type: "number", label: "Padding Right" },
            gap: { type: "number", label: "Gap" },
          },
        },

        title: {
          type: "object",
          objectFields: {
            text: { type: "text", label: "Title" },
            subtitle: { type: "textarea", label: "Subtitle" },
            fontSize: { type: "number", label: "Title Size" },
            fontWeight: { type: "number", label: "Title Weight" },
            color: { type: "text", label: "Title Color" },
            subtitleSize: { type: "number", label: "Subtitle Size" },
            subtitleWeight: { type: "number", label: "Subtitle Weight" },
            subtitleColor: { type: "text", label: "Subtitle Color" },
            subtitleWidth: { type: "number", label: "Subtitle Width" },
            subtitleMarginTop: { type: "number", label: "Subtitle Margin" },
            align: {
              type: "select",
              label: "Align",
              options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ],
            },
            marginBottom: { type: "number", label: "Margin Bottom" },
            lineWidth: { type: "number", label: "Line Width" },
            lineHeight: { type: "number", label: "Line Height" },
            lineColor: { type: "text", label: "Line Color" },
            positionX: { type: "number", label: "Position X" },
            positionY: { type: "number", label: "Position Y" },
          },
        },

        blocks: {
          type: "array",
          label: "Blocks",

          arrayFields: {
            mediaType: {
              type: "select",
              label: "Media Type",
              options: [
                { label: "Image", value: "image" },
                { label: "Video", value: "video" },
              ],
            },

            image: {
              type: "text",
              label: "Image URL / Base64",
            },

            video: {
              type: "custom",
              label: "Upload Video",

              render: ({ value, onChange }) => (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {value && (
                    <video
                      src={value}
                      controls
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        borderRadius: 8,
                        border: "1px solid #ddd",
                      }}
                    />
                  )}

                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (!file) return;

                      const reader = new FileReader();

                      reader.onload = () => {
                        onChange(reader.result);
                      };

                      reader.readAsDataURL(file);
                    }}
                  />
                </div>
              ),
            },
            poster: {
              type: "text",
              label: "Poster URL",
            },

            reverse: {
              type: "radio",
              label: "Reverse",
              options: [
                { label: "No", value: false },
                { label: "Yes", value: true },
              ],
            },

            title: {type: "text",label: "Title",},
            description: {type: "textarea",label: "Description",},
            mediaWidth: {
              type: "number",
              label: "Media Width",
            },

            mediaHeight: {
              type: "number",
              label: "Media Height",
            },

            objectFit: {
              type: "select",
              label: "Object Fit",
              options: [
                { label: "Cover", value: "cover" },
                { label: "Contain", value: "contain" },
                { label: "Fill", value: "fill" },
              ],
            },

            radiusTopLeft: { type: "number", label: "Radius TL" },
            radiusTopRight: { type: "number", label: "Radius TR" },
            radiusBottomLeft: { type: "number", label: "Radius BL" },
            radiusBottomRight: { type: "number", label: "Radius BR" },

            shadow: {
              type: "text",
              label: "Shadow",
            },

            hoverScale: {
              type: "number",
              label: "Hover Scale",
            },

            contentGap: {
              type: "number",
              label: "Content Gap",
            },

            titleSize: {
              type: "number",
              label: "Title Size",
            },

            titleWeight: {
              type: "number",
              label: "Title Weight",
            },

            titleColor: {
              type: "text",
              label: "Title Color",
            },

            textSize: {
              type: "number",
              label: "Text Size",
            },

            textColor: {
              type: "text",
              label: "Text Color",
            },

            lineHeight: {
              type: "number",
              label: "Line Height",
            },

            autoPlay: {
              type: "radio",
              label: "Auto Play",
              options: [
                { label: "False", value: false },
                { label: "True", value: true },
              ],
            },

            muted: {
              type: "radio",
              label: "Muted",
              options: [
                { label: "False", value: false },
                { label: "True", value: true },
              ],
            },

            loop: {
              type: "radio",
              label: "Loop",
              options: [
                { label: "False", value: false },
                { label: "True", value: true },
              ],
            },

            controls: {
              type: "radio",
              label: "Controls",
              options: [
                { label: "False", value: false },
                { label: "True", value: true },
              ],
            },

            animation: {
              type: "select",
              label: "Animation",
              options: [
                { label: "None", value: "" },
                { label: "Fade Up", value: "fade-up" },
                { label: "Fade Down", value: "fade-down" },
                { label: "Fade Left", value: "fade-left" },
                { label: "Fade Right", value: "fade-right" },
                { label: "Zoom In", value: "zoom-in" },
                { label: "Zoom Out", value: "zoom-out" },
                { label: "Flip Left", value: "flip-left" },
                { label: "Flip Right", value: "flip-right" },
              ],
            },
          },
        },
      },

      defaultProps: {
        section: {
          width: 1250,
          height: 700,
          background: "#fff",
          paddingTop: 80,
          paddingBottom: 80,
          paddingLeft: 20,
          paddingRight: 20,
          gap: 80,
        },

        title: {
          text: "VỀ CHÚNG TÔI",
          subtitle: "",
          fontSize: 28,
          fontWeight: 700,
          color: "#4CAF50",
          subtitleSize: 18,
          subtitleWeight: 400,
          subtitleColor: "#666",
          subtitleWidth: 900,
          subtitleMarginTop: 20,
          align: "left",
          marginBottom: 70,
          lineWidth: 180,
          lineHeight: 8,
          lineColor: "#FFC107",
          positionX: 0,
          positionY: 0,
        },

        blocks: [
          {
            mediaType: "video",
            image: "",
            video: "",
            poster: "",
            reverse: true,
            title: "Đội ngũ chuyên nghiệp",
            description: "Lorem ipsum dolor sit amet.",
            mediaWidth: 600,
            mediaHeight: 450,
            objectFit: "cover",
            radiusTopLeft: 0,
            radiusTopRight: 80,
            radiusBottomLeft: 80,
            radiusBottomRight: 0,
            shadow: "0 8px 20px rgba(0,0,0,.15)",
            hoverScale: 1.03,
            contentGap: 60,
            titleSize: 34,
            titleWeight: 700,
            titleColor: "#222",
            textSize: 18,
            textColor: "#666",
            lineHeight: 1.8,
            autoPlay: false,
            muted: true,
            loop: false,
            controls: true,
            animation: "fade-right",
          },
        ],
      },
      render: (props) => <AboutUsSection {...props} />,
    },
  },
};
