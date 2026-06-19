import React, { useState } from 'react';
// Sửa lỗi import từ package giả định sang package chuẩn @measured/puck
import { Puck } from "@measured/puck"; 
import puckConfig from "./admin-puck-config";
import "@measured/puck/dist/index.css"; 

// Dữ liệu ban đầu mặc định dựng khung hình giống ảnh mẫu Sen Hồng
const initialData = {
  content: [
    {
      type: 'SenHong',
      props: {
        title: 'Sen Hồng',
        titleColor: '#F7D060',
        titleSize: 'xl',
        subtitle: 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác – Đổi mới – Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sẻ chia nghĩa tình quê hương.',
        subtitleColor: '#ffffff',
        subtitleSize: 'base',
        cardStyle: { borderRadius: 28 },
        buttons: [
          { text: 'Tham gia cộng đồng', url: '#join', bgColor: '#3b82f6', textColor: '#ffffff', borderRadius: 999 }
        ],
        background: {
          type: 'image',
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920' 
        },
        layout: { align: 'left' },
        id: 'admin-sen-hong-instance-01'
      }
    }
  ],
  root: { props: {} }
};

function App() {
  const [data, setData] = useState(initialData);

  const handlePublish = (newData) => {
    console.log('Cấu trúc JSON giao diện lưu trữ thành công:', newData);
    setData(newData);
  };

  return (
    <div className="w-full min-h-screen">
      <Puck 
        config={puckConfig} 
        data={data} 
        onPublish={handlePublish}
      />
    </div>
  );
}

export default App;