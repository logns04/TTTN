import React from 'react';

import AdminSenHong from './components/admin-senhong';
import AdminBanChuyenMon from './components/admin-banchuyenmon';
import AdminAboutStructure from './components/admin-about-structure';
import AdminMemberLogos from './components/admin-member-logos';
import AdminStatsSection from'./components/admin-stats-section';
import AdminHeader from "./components/admin-header";
import AdminFooter from "./components/admin-footer";
//Config — đăng ký 5 components với fields + defaultProps + render.

export const puckConfig = {
  components: {
Header: {
label: "Header",

fields: {

  logo: {
    type: "object",
    label: "Logo",

    objectFields: {

      imageUrl: {
        type: "text",
        label: "Link Logo"
      },

      width: {
        type: "number",
        label: "Chiều rộng"
      },

      height: {
        type: "number",
        label: "Chiều cao"
      },

      borderWidth: {
        type: "number",
        label: "Độ dày viền"
      },

      borderColor: {
        type: "text",
        label: "Màu viền"
      },

      borderRadius: {
        type: "number",
        label: "Bo góc"
      }
    }
  },

  clubName: {
    type: "textarea",
    label: "Tên CLB"
  },

  clubNameColor: {
    type: "text",
    label: "Màu tên CLB"
  },

  clubNameSize: {
    type: "number",
    label: "Kích thước tên"
  },

  clubNameWeight: {
    type: "select",
    label: "Độ đậm",

    options: [
      { label: "400", value: "400" },
      { label: "500", value: "500" },
      { label: "600", value: "600" },
      { label: "700", value: "700" },
      { label: "800", value: "800" }
    ]
  },


  headerHeight: {
    type: "number",
    label: "Chiều cao Header"
  },

  backgroundColor: {
    type: "text",
    label: "Màu nền"
  },

  backgroundImage: {
    type: "text",
    label: "Ảnh nền"
  },

  containerWidth: {
    type: "number",
    label: "Chiều rộng tối đa"
  },

  paddingX: {
    type: "number",
    label: "Padding ngang"
  },

  overlayEnable: {
    type: "radio",

    options: [
      { label: "Bật", value: true },
      { label: "Tắt", value: false }
    ]
  },

  overlayColor: {
    type: "text",
    label: "Màu Overlay"
  },

  headerJustify: {
    type: "select",
    label: "Canh Header",

    options: [
      { label: "Space Between", value: "space-between" },
      { label: "Center", value: "center" },
      { label: "Space Around", value: "space-around" }
    ]
  },

  logoGap: {
    type: "number",
    label: "Khoảng cách Logo"
  },

  menuGap: {
    type: "number",
    label: "Khoảng cách Menu"
  },

  menuColor: {
    type: "text",
    label: "Màu Menu"
  },

  menuHoverColor: {
    type: "text",
    label: "Màu Hover"
  },

  menuFontSize: {
    type: "number",
    label: "Kích thước Menu"
  },

  menuFontWeight: {
    type: "select",
    label: "Độ đậm Menu",

    options: [
      { label: "400", value: "400" },
      { label: "500", value: "500" },
      { label: "600", value: "600" },
      { label: "700", value: "700" }
    ]
  },

  menus: {
    type: "array",
    label: "Danh sách Menu",

    arrayFields: {

      text: {
        type: "text",
        label: "Tên Menu"
      },

      url: {
        type: "text",
        label: "Link"
      }
    },

    getItemSummary: (item) => item.text
  },

  showLanguage: {
    type: "radio",

    options: [
      { label: "Hiện", value: true },
      { label: "Ẩn", value: false }
    ]
  }
},

defaultProps: {

  backgroundColor: "#0f47af",

  headerHeight: 120,

  clubName:
    "CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP\nTẠI TP.HCM",

  clubNameColor: "#ffffff",

  clubNameSize: 28,

  clubNameWeight: "700",

  logoGap: 16,

  menuGap: 40,

  menuColor: "#ffffff",

  menuHoverColor: "#facc15",

  menuFontSize: 16,

  menuFontWeight: "600",

  containerWidth: 1400,

  paddingX: 30,

  overlayEnable: false,

  overlayColor: "rgba(0,0,0,.25)",

  showLanguage: true,

  logo: {
    imageUrl: "",
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 999
  },

  menus: [
    {
      text: "Trang chủ",
      url: "#"
    },
    {
      text: "Giới thiệu",
      url: "#"
    },
    {
      text: "Hội viên",
      url: "#"
    },
    {
      text: "Liên hệ",
      url: "#"
    }
  ]
},

render: (props) => <AdminHeader {...props} />

},

Footer: {
label: "Footer",

fields: {
  footerLinksTitle: {
  type: "text",
  label: "Tiêu đề cột Link"
},

footerLinks: {
  type: "array",
  label: "Danh sách Link",

  arrayFields: {
    text: {
      type: "text",
      label: "Tên menu"
    },

    url: {
      type: "text",
      label: "Link"
    }
  }
},

otherTitle: {
  type: "text",
  label: "Tiêu đề cột Khác"
},

otherLinks: {
  type: "array",
  label: "Danh sách cột Khác",

  arrayFields: {
    text: {
      type: "text",
      label: "Tên"
    },

    url: {
      type: "text",
      label: "Link"
    }
  }
},
  logo: {
    type: "text",
    label: "Logo"
  },

  clubName: {
    type: "textarea",
    label: "Tên CLB"
  },

  address: {
    type: "textarea",
    label: "Địa chỉ"
  },

  phone: {
    type: "text",
    label: "Điện thoại"
  },

  email: {
    type: "text",
    label: "Email"
  },

  website: {
    type: "text",
    label: "Website"
  },

  backgroundColor: {
    type: "text",
    label: "Màu nền"
  },

  backgroundImage: {
    type: "text",
    label: "Ảnh nền"
  },

  overlayEnable: {
    type: "radio",

    options: [
      { label: "Bật", value: true },
      { label: "Tắt", value: false }
    ]
  },

  overlayColor: {
    type: "text",
    label: "Màu Overlay"
  },

  titleColor: {
    type: "text",
    label: "Màu tiêu đề"
  },

  textColor: {
    type: "text",
    label: "Màu nội dung"
  },

  socials: {
    type: "array",
    label: "Mạng xã hội",

    arrayFields: {

      name: {
        type: "text",
        label: "Tên"
      },

      url: {
        type: "text",
        label: "Link"
      }
    }
  },

  quickLinks: {
    type: "array",
    label: "Liên kết nhanh",

    arrayFields: {

      text: {
        type: "text",
        label: "Tên"
      },

      url: {
        type: "text",
        label: "Link"
      }
    }
  },

  copyright: {
    type: "text",
    label: "Copyright"
  }
},

defaultProps: {
  
  clubName:
    "CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP TẠI TP.HCM",

  address:
    "123 Nguyễn Huệ, Quận 1, TP.HCM",

  phone:
    "0909 999 999",

  email:
    "info@dongthapbusiness.vn",

  website:
    "www.dongthapbusiness.vn",

  backgroundColor:
    "#1f4aa8",

  titleColor:
    "#ffffff",

  textColor:
    "#dbeafe",

  overlayEnable: false,

  overlayColor:
    "rgba(0,0,0,.25)",

  socials: [
    {
      name: "Facebook",
      url: "#"
    },
    {
      name: "Youtube",
      url: "#"
    }
  ],

  quickLinks: [
    {
      text: "Trang chủ",
      url: "#"
    },
    {
      text: "Giới thiệu",
      url: "#"
    },
    {
      text: "Hội viên",
      url: "#"
    }
  ],

  copyright:
    "© 2026 CLB Doanh Nhân Đồng Tháp tại TP.HCM"
},

render: (props) => <AdminFooter {...props} />

},
    SenHong: {
      label: 'Sen Hồng',
      fields: {
        
        topText: { type: 'text', label: 'Text', contentEditable: true },
        title: { type: 'text', label: 'Tiêu đề lớn' ,contentEditable: true,},
        titleColor: { type: 'text', label: 'Màu chữ tiêu đề' },
        titleSize: {
          type: 'select', label: 'Kích cỡ tiêu đề',
          options: [
            { label: 'Nhỏ', value: 'sm' }, { label: 'Vừa', value: 'base' },
            { label: 'Lớn', value: 'lg' }, { label: 'Rất lớn', value: 'xl' }, { label: 'Cực đại', value: '2xl' }
          ]
        },
        subtitle: { type: 'textarea', label: 'Đoạn văn bản mô tả',contentEditable: true, },
        subtitleColor: { type: 'text', label: 'Màu chữ mô tả' },
        subtitleSize: {
          type: 'select', label: 'Kích cỡ chữ mô tả',
          options: [
            { label: 'Thấp', value: 'sm' }, { label: 'Mặc định', value: 'base' }, { label: 'Cao', value: 'lg' }
          ]
        },
cardStyle: {
  type: 'object',
  label: 'Bo góc khối kính mờ',

  objectFields: {

    topLeftRadius: {
      type: 'number',
      label: 'Góc trên trái',
      min: 0,
      max: 200
    },

    topRightRadius: {
      type: 'number',
      label: 'Góc trên phải',
      min: 0,
      max: 200
    },

    bottomRightRadius: {
      type: 'number',
      label: 'Góc dưới phải',
      min: 0,
      max: 200
    },

    bottomLeftRadius: {
      type: 'number',
      label: 'Góc dưới trái',
      min: 0,
      max: 200
    }

  }
},
        buttons: {
          type: 'array', label: 'Cấu hình danh sách nút',
          arrayFields: {
            text: { type: 'text', label: 'Nội dung chữ nút' },
            url: { type: 'text', label: 'Đường dẫn liên kết' },
            bgColor: { type: 'text', label: 'Màu nền nút' },
            textColor: { type: 'text', label: 'Màu chữ nút' },
            borderRadius: { type: 'number', label: 'Bo góc nút (px)' }
          },
          getItemSummary: (item) => item.text || 'Nút bấm'
        },
        background: {
          type: 'object', label: 'Nền phía sau (Background)',
          objectFields: {
            type: {
              type: 'select', label: 'Thể loại nền',
              options: [
                { label: 'Nền màu đơn sắc', value: 'color' },
                { label: 'Nền hình ảnh (PNG, JPG)', value: 'image' },
                { label: 'Nền động (GIF)', value: 'gif' },
                { label: 'Nền dải màu (Gradient)', value: 'gradient' }
              ]
            },
            color: { type: 'text', label: 'Màu nền' },
            imageUrl: { type: 'text', label: 'Đường dẫn URL ảnh/GIF' },
            gradientFrom: { type: 'text', label: 'Gradient bắt đầu' },
            gradientTo: { type: 'text', label: 'Gradient kết thúc' },
            gradientDirection: { type: 'text', label: 'Hướng luồng chạy' }
          }
        },
        layout: {
          type: 'object', label: 'Vị trí bố cục cụm',
          objectFields: {
            align: {
              type: 'select', label: 'Căn lề cụm',
              options: [
                { label: 'Nằm bên trái', value: 'left' },
                { label: 'Nằm chính giữa', value: 'center' },
                { label: 'Nằm bên phải', value: 'right' }
              ]
            }
          }
        }
      },
  
      defaultProps: {
        topText: 'LAN TỎA GIÁ TRỊ ĐẤT',
        title: 'Sen Hồng',
        titleColor: '#facc15', 
        titleSize: 'xl',
        subtitle: 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác - Đổi mới - Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sẻ chia nghĩa tình quê hương.',
        subtitleColor: '#ffffff',
        subtitleSize: 'base',
        cardStyle: {
        topLeftRadius: 40,
        topRightRadius: 120,
        bottomRightRadius: 40,
        bottomLeftRadius: 120
      },
        buttons: [{ text: 'Tham gia cộng đồng', bgColor: '#2563eb', textColor: '#ffffff', borderRadius: 999 }],
        background: { type: 'image', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920' },
        layout: { align: 'left' }
      },
      render: (props) => <AdminSenHong {...props} />
    },  
    // ĐĂNG KÝ COMPONENT BAN CHUYÊN MÔN
    BanChuyenMon: {
      label: 'Các Ban Chuyên Môn',
      fields: {
        sectionTitle: { type: 'text', label: 'Tiêu đề chính' },
        sectionSubtitle: { type: 'text', label: 'Tiêu đề phụ' },
      
        cards: {
          type: 'array',
          label: 'Danh sách các Ban',
          arrayFields: {
            title: { type: 'text', label: 'Tên Ban chuyên môn' },
            iconUrl: { type: 'text', label: 'URL ảnh Icon (PNG trắng/SVG)' },
  
        cardStyle: {
          type: 'object',
          label: 'Bo góc khối',

          objectFields: {

            topLeftRadius: {
              type: 'number',
              label: 'Góc trên trái',
              min: 0,
              max: 200
            },

            topRightRadius: {
              type: 'number',
              label: 'Góc trên phải',
              min: 0,
              max: 200
            },

            bottomRightRadius: {
              type: 'number',
              label: 'Góc dưới phải',
              min: 0,
              max: 200
            },

            bottomLeftRadius: {
              type: 'number',
              label: 'Góc dưới trái',
              min: 0,
              max: 200
            }

          }
        },

            buttonText: { type: 'text', label: 'Chữ trong nút' },
            buttonUrl: { type: 'text', label: 'Đường dẫn nút (URL)' },
            btnBorderRadius: { type: 'number', label: 'Bo góc nút bấm (px)', min: 0, max: 40 }
          },
          getItemSummary: (item) => item.title || 'Ban chuyên môn mới'
        },
        
        background: {
          type: 'object',
          label: 'Tùy chọn nền phía sau',
          objectFields: {
            type: {
              type: 'select',
              label: 'Loại nền',
              options: [
                { label: 'Nền màu đơn sắc', value: 'color' },
                { label: 'Nền hình ảnh (PNG, JPG)', value: 'image' },
                { label: 'Nền động (GIF)', value: 'gif' },
                { label: 'Nền dải màu (Gradient)', value: 'gradient' }
              ]
            },
            color: { type: 'text', label: 'Màu nền' },
            imageUrl: { type: 'text', label: 'Đường dẫn hình ảnh/GIF nền' },
            gradientFrom: { type: 'text', label: 'Gradient từ màu' },
            gradientTo: { type: 'text', label: 'Gradient đến màu' },
            gradientDirection: { type: 'text', label: 'Hướng luồng chạy' }
          }
        }
      },

      defaultProps: {
        sectionTitle: 'Các Ban Chuyên Môn',
        sectionSubtitle: 'CLB Doanh nhân Đồng Tháp tại TP. Hồ Chí Minh',
        background: { type: 'color', color: '#f8fafc' },
        cards: [
          { title: 'Ban Kinh tế - Đầu tư', iconUrl: 'https://cdn-icons-png.flaticon.com/512/3121/3121768.png', buttonText: 'Xem hoạt động →', buttonUrl: '#', btnBorderRadius: 999, styleType: 'leaf', cardBorderRadius: 40 },
          { title: 'Ban Văn hóa - Thể thao', iconUrl: 'https://cdn-icons-png.flaticon.com/128/251/251678.png', buttonText: 'Xem hoạt động →', buttonUrl: '#', btnBorderRadius: 999, styleType: 'leaf', cardBorderRadius: 40 },
          { title: 'Ban Xã hội - Cộng đồng', iconUrl: 'https://cdn-icons-png.flaticon.com/128/251/251663.png', buttonText: 'Xem hoạt động →', buttonUrl: '#', btnBorderRadius: 999, styleType: 'leaf', cardBorderRadius: 40 },
          { title: 'Ban Khởi nghiệp', iconUrl: 'https://cdn-icons-png.flaticon.com/128/251/251697.png', buttonText: 'Xem hoạt động →', buttonUrl: '#', btnBorderRadius: 999, styleType: 'leaf', cardBorderRadius: 40 },
          { title: 'Ban Giao thương quốc tế', iconUrl: 'https://cdn-icons-png.flaticon.com/128/251/251692.png', buttonText: 'Xem hoạt động →', buttonUrl: '#', btnBorderRadius: 999, styleType: 'leaf', cardBorderRadius: 40 }
        ]
      },
      render: (props) => <AdminBanChuyenMon {...props} />
    },
    // ĐĂNG KÝ THÀNH PHẦN ABOUT & STRUCTURE
    AboutStructure: { 
      label: 'Giới thiệu & Cơ cấu tổ chức',
      fields: {
        columns: {
          type: 'array',
          label: 'Danh sách khối hiển thị',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề khối lớn', contentEditable: true },
            text: { type: 'textarea', label: 'Đoạn văn bản mô tả (Nếu có)' },
            cardBorderRadius: { type: 'number', label: 'Độ bo góc khối (px)', min: 0, max: 50 },
            members: {
              type: 'array',
              label: 'Danh sách thành viên ban bệ',
              arrayFields: {
                name: { type: 'text', label: 'Họ và tên thành viên', contentEditable: true },
                avatarUrl: { type: 'text', label: 'Đường dẫn link ảnh chân dung (Avatar)' },
                clbRole: { type: 'text', label: 'Chức vụ trong CLB' },
                bizRole: { type: 'text', label: 'Chức vụ ngoài doanh nghiệp' },
                company: { type: 'text', label: 'Tên Doanh nghiệp công tác' }
              },
              getItemSummary: (member) => member.name || 'Thành viên ban bệ'
            }
          },
          getItemSummary: (item) => item.title || 'Khối nội dung mới'
        },
        background: {
          type: 'object',
          label: 'Tùy chọn nền phía sau',
          objectFields: {
            type: {
              type: 'select',
              label: 'Loại nền',
              options: [
                { label: 'Nền màu đơn sắc', value: 'color' },
                { label: 'Nền hình ảnh (PNG, JPG)', value: 'image' },
                { label: 'Nền động (GIF)', value: 'gif' },
                { label: 'Nền dải màu (Gradient)', value: 'gradient' }
              ]
            },
            color: { type: 'text', label: 'Màu nền' },
            imageUrl: { type: 'text', label: 'Đường dẫn hình ảnh/GIF nền' },
            gradientFrom: { type: 'text', label: 'Gradient từ màu' },
            gradientTo: { type: 'text', label: 'Gradient đến màu' },
            gradientDirection: { type: 'text', label: 'Hướng luồng chạy' }
          }
        }
      },
      defaultProps: {
        background: {
          type: 'gradient',
          gradientFrom: '#f1f5f9',
          gradientTo: '#e2e8f0',
          gradientDirection: 'to bottom'
        },
        columns: [
          {
            title: 'VỀ CÂU LẠC BỘ',
            cardBorderRadius: 16,
            text: 'CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh. Với tinh thần kết nối – đồng hành – sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.',
            members: []
          },
          {
            title: 'CƠ CẤU TỔ CHỨC',
            cardBorderRadius: 16,
            text: '',
            members: [
              {
                name: 'Trần Văn Khang',
                clbRole: 'Ủy viên BCH',
                bizRole: 'Tổng Giám đốc',
                company: 'Công ty CP Logistics Đồng Tháp',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl5LWHka_MrFsEkzJhSSfDoWK60Gnchgc30gmVd4nzyA&s=10'
              },
              {
                name: 'Đỗ Thu Trang',
                clbRole: 'Thủ quỹ CLB',
                bizRole: 'Giám đốc Tài chính',
                company: 'Công ty TNHH Sen Việt',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtlS88WH7qgr_j8fLyt7xv7WLgcdKwnrOXVa4AQGw7Hg&s=10'
              },
              {
                name: 'Vũ Hoàng Long',
                clbRole: 'Ủy viên BCH',
                bizRole: 'Giám đốc Điều hành',
                company: 'Công ty Công nghệ số Mekong',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7UIbmW3B1ODjhsmJoSlsHQlp1H4IFKtP6gMb1JeoOVg&s=10'
              }
            ]
          }
        ]
      },
      render: (props) => <AdminAboutStructure {...props} />
    },
    MemberLogos: {  
  label: 'LOGO',

  fields: {
    
    title: {
      type: 'text',
      label: 'Tiêu đề',
      contentEditable: true
    },
      titleColor: {
      type: 'text',
      label: 'Màu tiêu đề'
    },

      titleSize: {
      type: 'select',
      label: 'Kích thước tiêu đề',

      options: [
        { label: 'Nhỏ', value: 'sm' },
        { label: 'Vừa', value: 'base' },
        { label: 'Lớn', value: 'lg' },
        { label: 'Rất lớn', value: 'xl' },
        { label: 'Cực lớn', value: '2xl' }
      ]
    },

    titleAlign: {
      type: 'select',
      label: 'Vị trí tiêu đề',

      options: [
        { label: 'Trái', value: 'left' },
        { label: 'Giữa', value: 'center' },
        { label: 'Phải', value: 'right' }
      ]
    },
    speed: {
      type: 'number',
      label: 'Tốc độ chạy (giây)'
    },

    hoverEffect: {
      type: 'select',
      label: 'Hiệu ứng hover',

      options: [
        { label: 'Zoom', value: 'zoom' },
        { label: 'Nổi lên', value: 'lift' },
        { label: 'Xoay nhẹ', value: 'rotate' }
      ]
    },

    logoWidth: {
      type: 'number',
      label: 'Chiều rộng logo'
    },

    logoHeight: {
      type: 'number',
      label: 'Chiều cao logo'
    },

    cardRadius: {
      type: 'number',
      label: 'Bo góc card'
    },

    logos: {
      type: 'array',
      label: 'Danh sách logo',

      arrayFields: {

        imageUrl: {
          type: 'text',
          label: 'URL Logo'
        },

        alt: {
          type: 'text',
          label: 'Tên Logo'
        },
        overlay: {
  type: 'object',
  label: 'Lớp phủ Gradient',
},
      },

      getItemSummary: (item) =>
        item.alt || 'Logo'
    },

    background: {
      type: 'object',
      label: 'Nền',

      objectFields: {

        type: {
          type: 'select',
          label: 'Loại nền',

          options: [
            { label: 'Màu', value: 'color' },
            { label: 'Gradient', value: 'gradient' },
            { label: 'Ảnh', value: 'image' }
          ]
        },

        color: {
          type: 'text',
          label: 'Màu nền'
        },

        imageUrl: {
          type: 'text',
          label: 'URL ảnh'
        },

        gradientFrom: {
          type: 'text',
          label: 'Gradient From'
        },

        gradientTo: {
          type: 'text',
          label: 'Gradient To'
        },

        gradientDirection: {
          type: 'text',
          label: 'Direction'
        }
      }
    }
  },

  defaultProps: {
    
  titleColor: {
  type: 'text',
  label: 'Màu tiêu đề'
},
  overlay: {
  enabled: 'true',
  gradientFrom: '#0f172a',
  gradientTo: '#2563eb',
  direction: 'to right',
  opacity: 0.5
},
titleSize: {
  type: 'select',
  label: 'Kích thước tiêu đề',
  options: [
    { label: 'Nhỏ', value: 'sm' },
    { label: 'Vừa', value: 'base' },
    { label: 'Lớn', value: 'lg' },
    { label: 'Rất lớn', value: 'xl' },
    { label: 'Cực lớn', value: '2xl' }
  ]
},

titleAlign: {
  type: 'select',
  label: 'Vị trí tiêu đề',
  options: [
    { label: 'Trái', value: 'left' },
    { label: 'Giữa', value: 'center' },
    { label: 'Phải', value: 'right' }
  ]
},
    title:
      'HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
    titleColor: '#0f2f6e',

    titleSize: 'xl',

    titleAlign: 'center',
    speed: 20,

    hoverEffect: 'zoom',

    logoWidth: 220,

    logoHeight: 130,

    cardRadius: 24,
    titleColor: {
  type: 'text',
  label: 'Màu tiêu đề'
},

titleSize: {
  type: 'select',
  label: 'Kích thước tiêu đề',
  options: [
    { label: 'Nhỏ', value: 'sm' },
    { label: 'Vừa', value: 'base' },
    { label: 'Lớn', value: 'lg' },
    { label: 'Rất lớn', value: 'xl' },
    { label: 'Cực lớn', value: '2xl' }
  ]
},

titleAlign: {
  type: 'select',
  label: 'Vị trí tiêu đề',
  options: [
    { label: 'Trái', value: 'left' },
    { label: 'Giữa', value: 'center' },
    { label: 'Phải', value: 'right' }
  ]
},

    background: {
      overlay: {
  type: 'object',
  label: 'Gradient phủ trên nền',

  objectFields: {
    enabled: {
      type: 'select',
      label: 'Bật/Tắt Overlay',
      options: [
        { label: 'Bật', value: 'true' },
        { label: 'Tắt', value: 'false' }
      ]
    },

    gradientFrom: {
      type: 'text',
      label: 'Màu bắt đầu'
    },

    gradientTo: {
      type: 'text',
      label: 'Màu kết thúc'
    },

    direction: {
      type: 'text',
      label: 'Hướng Gradient'
    },

    opacity: {
      type: 'number',
      label: 'Độ trong suốt',
      min: 0,
      max: 1
    }
  }
},
      type: 'color',
      color: '#dff4ff'
    },

    logos: [
      {
        imageUrl: 'https://via.placeholder.com/200x100',
        alt: 'Logo 1'
      },
      {
        imageUrl: 'https://via.placeholder.com/200x100',
        alt: 'Logo 2'
      }
    ]
  },

  render: (props) =>
    <AdminMemberLogos {...props} />
},
    StatsSection: {
  label: "Thống kê",

  fields: {

    title: {
      type: "text",
      label: "Tiêu đề"
    },

    titleColor: {
      type: "text",
      label: "Màu tiêu đề"
    },

    titleSize: {
      type: "select",
      label: "Kích cỡ",

      options: [
        {label:"Nhỏ",value:"sm"},
        {label:"Vừa",value:"base"},
        {label:"Lớn",value:"lg"},
        {label:"Rất lớn",value:"xl"},
        {label:"Cực lớn",value:"2xl"}
      ]
    },

    titleAlign: {
      type: "select",
      label: "Vị trí",

      options: [
        {label:"Trái",value:"left"},
        {label:"Giữa",value:"center"},
        {label:"Phải",value:"right"}
      ]
    },

    stats: {
      type: "array",

      label: "Danh sách thống kê",

arrayFields: {

  number: {
    type: "number",
    label: "Số"
  },

  suffix: {
    type: "text",
    label: "Ký hiệu phía sau"
  },

  text: {
    type: "textarea",
    label: "Mô tả"
  },

  numberColor: {
    type: "text",
    label: "Màu số"
  },

  numberSize: {
    type: "select",
    label: "Kích cỡ số",

    options: [
      { label: "Nhỏ", value: "sm" },
      { label: "Vừa", value: "base" },
      { label: "Lớn", value: "lg" },
      { label: "Rất lớn", value: "xl" },
      { label: "Cực lớn", value: "2xl" }
    ]
  },

  textColor: {
    type: "text",
    label: "Màu mô tả"
  },

  textSize: {
    type: "select",
    label: "Kích cỡ mô tả",

    options: [
      { label: "Nhỏ", value: "sm" },
      { label: "Vừa", value: "base" },
      { label: "Lớn", value: "lg" }
    ]
  },

  align: {
    type: "select",
    label: "Căn lề",

    options: [
      { label: "Trái", value: "left" },
      { label: "Giữa", value: "center" },
      { label: "Phải", value: "right" }
    ]
  },

  backgroundColor: {
    type: "text",
    label: "Màu nền cụm"
  },

  borderRadius: {
    type: "number",
    label: "Bo góc"
  },

  padding: {
    type: "number",
    label: "Padding"
  }

},

      getItemSummary: (item) =>
        item.text || "Thống kê"
    },

    background: {
      type: "object",

      label: "Nền",

      objectFields: {

        type: {
          type: "select",

          options: [
            {
              label:"Màu",
              value:"color"
            },
            {
              label:"Ảnh",
              value:"image"
            },
            {
              label:"GIF",
              value:"gif"
            },
            {
              label:"Gradient",
              value:"gradient"
            }
          ]
        },

        color: {
          type:"text"
        },

        imageUrl: {
          type:"text"
        },

        gradientFrom: {
          type:"text"
        },

        gradientTo: {
          type:"text"
        },

        gradientDirection: {
          type:"text"
        }

      }
    },

    overlay: {
      type:"object",

      label:"Gradient phủ",

      objectFields: {

        enabled: {
          type:"radio",

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

        gradientFrom:{
          type:"text"
        },

        gradientTo:{
          type:"text"
        },

        direction:{
          type:"text"
        },

        opacity:{
          type:"number"
        }

      }
    }

  },

  defaultProps: {

    title:
      "HÀNH TRÌNH KIẾN TẠO & GẮN KẾT GIÁ TRỊ",

    titleColor:"#0f4c81",

    titleSize:"xl",

    titleAlign:"center",

stats: [
  {
    number: 500,
    suffix: "+",

    text: "Hội viên là các doanh nghiệp",

    numberColor: "#0f4c81",
    numberSize: "2xl",

    textColor: "#374151",
    textSize: "base",

    align: "center",

    backgroundColor: "#ffffff",

    borderRadius: 20,

    padding: 24
  }
]
  },

  render:(props)=>
    <AdminStatsSection
      {...props}
    />
}
  },

  // Sidebar categories
  categoryGroups: [
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout', components: ['Section'] },
    { title: 'Nâng cao', components: ["Header",
      "Footer",
      "SenHong",
      "BanChuyenMon",
      "AboutStructure",
      "MemberLogos",
      "StatsSection"] }
  ],

  // Root config
  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;
