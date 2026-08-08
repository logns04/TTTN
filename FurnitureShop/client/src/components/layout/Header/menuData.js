export const menuData = [
  {
    title: "Trang chủ",
    link: "/",
  },
  {
    title: "Sản phẩm",
    link: "/products",
    children: [
      {
        title: "Phòng khách",
        items: [
          "Sofa",
          "Bàn trà",
          "Kệ TV",
          "Ghế thư giãn",
        ],
      },
      {
        title: "Phòng ngủ",
        items: [
          "Giường ngủ",
          "Tủ quần áo",
          "Tab đầu giường",
          "Bàn trang điểm",
        ],
      },
      {
        title: "Phòng ăn",
        items: [
          "Bàn ăn",
          "Ghế ăn",
          "Tủ bếp",
        ],
      },
    ],
  },
  {
    title: "Tin tức",
    link: "/news",
  },
  {
    title: "Giới thiệu",
    link: "/about",
  },
  {
    title: "Liên hệ",
    link: "/contact",
  },
];