import React from 'react';
import AdminHeading from './components/admin-heading';
import AdminText from './components/admin-text';
import AdminImage from './components/admin-image';
import AdminSection from './components/admin-section';
import AdminHero from './components/admin-hero';
import AdminSenHong from './components/admin-senhong';
import AdminBanChuyenMon from './components/admin-banchuyenmon';
import AdminAboutStructure from './components/admin-about-structure';
//Config — đăng ký 5 components với fields + defaultProps + render.

export const puckConfig = {
  components: {
    Heading: {
      label: 'Tiêu đề',
      fields: {
        content: { type: 'text', label: 'Nội dung', contentEditable: true },
        level: {
          type: 'select', label: 'Cấp độ',
          options: [
            { label: 'H1', value: 1 }, { label: 'H2', value: 2 },
            { label: 'H3', value: 3 }, { label: 'H4', value: 4 },
            { label: 'H5', value: 5 }, { label: 'H6', value: 6 }
          ]
        },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: { content: 'Tiêu đề', level: 2, align: 'left' },
      render: (props) => <AdminHeading {...props} />
    },

    Text: {
      label: 'Văn bản',
      fields: {
        content: { type: 'textarea', label: 'Nội dung', contentEditable: true },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' },
            { label: 'Đều', value: 'justify' }
          ]
        }
      },
      defaultProps: { content: 'Nhập văn bản ở đây...', align: 'left' },
      render: (props) => <AdminText {...props} />
    },

    Image: {
      label: 'Ảnh',
      fields: {
        src: { type: 'text', label: 'URL ảnh' },
        alt: { type: 'text', label: 'Alt text' },
        width: { type: 'text', label: 'Chiều rộng', default: '100%' },
        height: { type: 'text', label: 'Chiều cao', default: 'auto' },
        borderRadius: { type: 'text', label: 'Bo góc', default: '0' },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: {
        src: 'https://via.placeholder.com/800x400',
        alt: 'Ảnh minh họa',
        width: '100%', height: 'auto', borderRadius: '0', align: 'center'
      },
      render: (props) => <AdminImage {...props} />
    },

    Section: {
      label: 'Khoảng (Section)',
      fields: {
        container: {
          type: 'select', label: 'Chiều rộng',
          options: [
            { label: 'Small (640px)', value: 'sm' },
            { label: 'Medium (768px)', value: 'md' },
            { label: 'Large (1024px)', value: 'lg' },
            { label: 'XL (1280px)', value: 'xl' }
          ]
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại',
              options: [
                { label: 'Màu', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            fromColor: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            toColor: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            direction: { type: 'text', label: 'Hướng gradient', default: 'to right' },
            bg_image: { type: 'text', label: 'URL ảnh nền' },
            opacity: { type: 'number', label: 'Độ mờ', min: 0, max: 1, step: 0.1, default: 1 }
          }
        },
        padding_x: { type: 'number', label: 'Padding ngang', min: 0, max: 16, default: 4 },
        padding_y: { type: 'number', label: 'Padding dọc', min: 0, max: 16, default: 4 },
        content: { type: 'slot' } // Cho phép nested components
      },
      defaultProps: {
        container: 'lg',
        background: { type: 'color', color: '#ffffff' },
        padding_x: 4, padding_y: 4,
        content: []
      },
      render: (props) => <AdminSection {...props} />
    },

    Hero: {
      label: 'Hero Banner',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        subtitle: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        buttons: {
          type: 'array', label: 'Danh sách nút',
          arrayFields: {
            text: { type: 'text', label: 'Text nút', contentEditable: true },
            url: { type: 'text', label: 'URL' },
            style: {
              type: 'select', label: 'Style',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Outline', value: 'outline' }
              ]
            }
          },
          getItemSummary: (item) => item.text
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại',
              options: [
                { label: 'Màu', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
            imageUrl: { type: 'text', label: 'URL ảnh nền' }
          }
        },
        layout: {
          type: 'object', label: 'Bố cục',
          objectFields: {
            align: {
              type: 'select', label: 'Căn lề',
              options: [
                { label: 'Trái', value: 'left' },
                { label: 'Giữa', value: 'center' },
                { label: 'Phải', value: 'right' }
              ]
            }
          }
        }
      },
      defaultProps: {
        title: 'Chào mừng đến với website',
        subtitle: 'Chúng tôi cung cấp những sản phẩm và dịch vụ tốt nhất',
        buttons: [
          { text: 'Tìm hiểu thêm', url: '#', style: 'primary' },
          { text: 'Liên hệ', url: '#contact', style: 'outline' }
        ],
        background: {
          type: 'gradient',
          gradientFrom: '#667eea', gradientTo: '#764ba2',
          gradientDirection: 'to bottom right'
        },
        layout: { align: 'center' }
      },
      render: (props) => <AdminHero {...props} />
    },
  // ĐĂNG KÝ GD Sen Hồng
    SenHong: {
      label: 'Giao diện Sen Hồng',
      fields: {
        topText: { type: 'text', label: 'Dòng chữ nhỏ phía trên', contentEditable: true },
        title: { type: 'text', label: 'Tiêu đề lớn' },
        titleColor: { type: 'text', label: 'Màu chữ tiêu đề' },
        titleSize: {
          type: 'select', label: 'Kích cỡ tiêu đề',
          options: [
            { label: 'Nhỏ', value: 'sm' }, { label: 'Vừa', value: 'base' },
            { label: 'Lớn', value: 'lg' }, { label: 'Rất lớn', value: 'xl' }, { label: 'Cực đại', value: '2xl' }
          ]
        },
        subtitle: { type: 'textarea', label: 'Đoạn văn bản mô tả' },
        subtitleColor: { type: 'text', label: 'Màu chữ mô tả' },
        subtitleSize: {
          type: 'select', label: 'Kích cỡ chữ mô tả',
          options: [
            { label: 'Thấp', value: 'sm' }, { label: 'Mặc định', value: 'base' }, { label: 'Cao', value: 'lg' }
          ]
        },
        cardStyle: {
          type: 'object', label: 'Kiểu dáng khối kính mờ',
          objectFields: {
            styleType: {
              type: 'select',
              label: 'Kiểu dáng bo góc',
              options: [
                { label: 'Dáng chiếc lá chéo đối xứng', value: 'leaf' },
                { label: 'Bo tròn đều cả 4 góc', value: 'round' }
              ]
            },
            borderRadius: { type: 'number', label: 'Độ bo góc khối (px)', min: 0, max: 120 }
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
        cardStyle: { styleType: 'leaf', borderRadius: 48 }, 
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
  
            styleType: {
              type: 'select',
              label: 'Kiểu dáng khối',
              options: [
                { label: 'Dáng chiếc lá (Chéo đối xứng)', value: 'leaf' },
                { label: 'Bo tròn đều 4 góc', value: 'round' }
              ]
            },
            cardBorderRadius: { type: 'number', label: 'Độ bo góc khối (px)', min: 0, max: 100 },

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
    }
    
  },

  // Sidebar categories
  categoryGroups: [
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout', components: ['Section'] },
    { title: 'Nâng cao', components: ['Hero','SenHong','BanChuyenMon','AboutStructure'] }
  ],

  // Root config
  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;
