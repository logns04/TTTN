import React from "react";

const AdminFooter = (props) => {

  const logo =
    props.logo ??
    props.puck?.render?.logo;

  const clubName =
    props.clubName ??
    props.puck?.render?.clubName;

  const address =
    props.address ??
    props.puck?.render?.address;

  const email =
    props.email ??
    props.puck?.render?.email;

  const hotline =
    props.hotline ??
    props.puck?.render?.hotline;

  const links =
    props.links ??
    props.puck?.render?.links;

  const members =
    props.members ??
    props.puck?.render?.members;

  const backgroundColor =
    props.backgroundColor ??
    props.puck?.render?.backgroundColor;

  const backgroundImage =
    props.backgroundImage ??
    props.puck?.render?.backgroundImage;

  const copyright =
    props.copyright ??
    props.puck?.render?.copyright;

  const facebookUrl =
    props.facebookUrl ??
    props.puck?.render?.facebookUrl;

  const youtubeUrl =
    props.youtubeUrl ??
    props.puck?.render?.youtubeUrl;

  const linkedinUrl =
    props.linkedinUrl ??
    props.puck?.render?.linkedinUrl;

  const tiktokUrl =
    props.tiktokUrl ??
    props.puck?.render?.tiktokUrl;

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor,
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-3 gap-12">

          <div>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={logo}
                alt=""
                className="w-20 h-20"
              />

              <h2 className="font-bold text-xl">
                {clubName}
              </h2>
            </div>

            <div className="space-y-4">
              <p>{address}</p>
              <p>{email}</p>
              <p>{hotline}</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Liên kết trang
            </h3>

            <ul className="space-y-3">
              {links?.map((item, index) => (
                <li key={index}>
                  <a href={item.link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Khác
            </h3>

            <ul className="space-y-3">
              {members?.map((item, index) => (
                <li key={index}>
                  <a href={item.link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t mt-10 pt-6 flex justify-between items-center">

          <div>
            {copyright}
          </div>

          <div className="flex gap-3">

            <a href={facebookUrl}>
              Facebook
            </a>

            <a href={youtubeUrl}>
              Youtube
            </a>

            <a href={linkedinUrl}>
              Linkedin
            </a>

            <a href={tiktokUrl}>
              TikTok
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default AdminFooter;