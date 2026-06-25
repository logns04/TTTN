import React from "react";

const AboutOrganization = ({
  sectionHeight = 1000,

  // BACKGROUND
  backgroundType = "gradient",
  backgroundColor = "#ffffff",
  gradientFrom = "#DDF6FF",
  gradientTo = "#F7E4FF",
  backgroundImage = "",

  // OVERLAY
  overlayEnable = false,
  overlayFrom = "rgba(0,87,255,.15)",
  overlayTo = "rgba(255,255,255,0)",
  overlayDirection = "135deg",
  overlayOpacity = 100,

  // BLOCKS
  blocks = [],
}) => {
  const getBackgroundStyle = () => {
    if (
      backgroundType === "image" &&
      backgroundImage
    ) {
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };
    }

    if (backgroundType === "gradient") {
      return {
        background: `linear-gradient(
          135deg,
          ${gradientFrom},
          ${gradientTo}
        )`,
      };
    }

    return {
      backgroundColor,
    };
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: `${sectionHeight}px`,
        ...getBackgroundStyle(),
      }}
    >
      {/* OVERLAY */}
      {overlayEnable && (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(
              ${overlayDirection},
              ${overlayFrom},
              ${overlayTo}
            )`,
            opacity: overlayOpacity / 100,
          }}
        />
      )}

      {/* CONTENT */}
      <div className="relative z-[2] max-w-[1600px] mx-auto">

        {blocks.map((block, blockIndex) => (
          <div
            key={blockIndex}
            className="absolute"
            style={{
              left: `${block.x || 0}px`,
              top: `${block.y || 0}px`,

              width: `${block.width || 650}px`,
              minHeight: `${block.height || 700}px`,

              background:
                block.background ||
                "#ffffff",

              border:
                `${block.borderWidth || 1}px solid ${
                  block.borderColor || "#ddd"
                }`,

              borderTopLeftRadius:
                `${block.radiusTL || 30}px`,

              borderTopRightRadius:
                `${block.radiusTR || 30}px`,

              borderBottomLeftRadius:
                `${block.radiusBL || 30}px`,

              borderBottomRightRadius:
                `${block.radiusBR || 30}px`,

              padding:
                `${block.padding || 40}px`,

              boxShadow:
                block.shadow ||
                "0 15px 40px rgba(0,0,0,.08)",
            }}
          >
            {/* IMAGE */}
            {block.image && (
              <img
                src={block.image}
                alt=""
                className="w-full mb-8 object-cover"
                style={{
                  height:
                    `${block.imageHeight || 260}px`,

                  borderTopLeftRadius:
                    `${block.imageRadiusTL || 20}px`,

                  borderTopRightRadius:
                    `${block.imageRadiusTR || 20}px`,

                  borderBottomLeftRadius:
                    `${block.imageRadiusBL || 20}px`,

                  borderBottomRightRadius:
                    `${block.imageRadiusBR || 20}px`,
                }}
              />
            )}

            {/* TITLE */}
            <h2
              contentEditable
              suppressContentEditableWarning
              style={{
                color:
                  block.titleColor ||
                  "#00589C",

                fontSize:
                  `${block.titleSize || 42}px`,

                fontWeight:
                  block.titleWeight || 800,

                textAlign:
                  block.textAlign || "left",

                outline: "none",
              }}
            >
              {block.title}
            </h2>

            {/* DESCRIPTION */}
            <div
              contentEditable
              suppressContentEditableWarning
              style={{
                marginTop: "25px",

                color:
                  block.descriptionColor ||
                  "#163C6B",

                fontSize:
                  `${block.descriptionSize || 18}px`,

                lineHeight: 1.8,

                textAlign:
                  block.textAlign || "left",

                outline: "none",
              }}
            >
              {block.description}
            </div>

            {/* MEMBERS */}
            {block.members?.length > 0 && (
              <div
                className="mt-10 flex flex-col"
                style={{
                  gap:
                    `${block.gap || 20}px`,
                }}
              >
                {block.members.map(
                  (member, memberIndex) => (
                    <div
                      key={memberIndex}
                      style={{
                        background:
                          member.background ||
                          "#ffffff",

                        borderRadius:
                          `${member.cardRadius || 24}px`,

                        padding:
                          `${member.cardPadding || 20}px`,

                        transition:
                          "all .3s ease",

                        cursor: "pointer",

                        boxShadow:
                          member.shadow ||
                          "0 8px 25px rgba(0,0,0,.06)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          `translateY(${
                            member.hoverTranslateY || -6
                          }px)
                           scale(${
                            member.hoverScale || 1.02
                          })`;

                        e.currentTarget.style.boxShadow =
                          member.hoverShadow ||
                          "0 20px 40px rgba(0,0,0,.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0) scale(1)";

                        e.currentTarget.style.boxShadow =
                          member.shadow ||
                          "0 8px 25px rgba(0,0,0,.06)";
                      }}
                    >
                      <div className="flex flex-col md:flex-row gap-5">
                        {/* AVATAR */}
                        {member.avatar && (
                          <img
                            src={member.avatar}
                            alt=""
                            style={{
                              width:
                                `${member.avatarSize || 110}px`,

                              height:
                                `${member.avatarSize || 110}px`,

                              borderRadius:
                                `${member.avatarRadius || 999}px`,

                              objectFit: "cover",
                            }}
                          />
                        )}

                        {/* INFO */}
                        <div className="flex-1">

                          <p>
                            <strong>Họ tên:</strong>{" "}
                            {member.name}
                          </p>

                          <p className="mt-2">
                            <strong>
                              Chức vụ CLB:
                            </strong>{" "}
                            {member.clubRole}
                          </p>

                          <p className="mt-2">
                            <strong>
                              Chức vụ DN:
                            </strong>{" "}
                            {member.businessRole}
                          </p>

                          <p className="mt-2">
                            <strong>
                              Doanh nghiệp:
                            </strong>{" "}
                            {member.company}
                          </p>

                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutOrganization;