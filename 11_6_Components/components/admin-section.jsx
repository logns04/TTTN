import React from 'react';

const containerMap = { 
  sm: '640px', 
  md: '768px', 
  lg: '1024px', 
  xl: '1280px', 
  '2xl': '1536px' 
};

const AdminSection = ({ container = 'xl', background = {}, padding_x = 4, padding_y = 12, children }) => {
  const bgStyle = {};

  if (background.type === 'color') {
    bgStyle.backgroundColor = background.color || '#ffffff';
  }
  if (background.type === 'gradient') {
    bgStyle.background = `linear-gradient(${background.direction || 'to right'}, ${background.fromColor || '#667eea'}, ${background.toColor || '#764ba2'})`;
  }
  if (background.type === 'image' && background.bg_image) {
    bgStyle.backgroundImage = `url(${background.bg_image})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
    bgStyle.backgroundRepeat = 'no-repeat';
  }

  return (
    <section 
      style={{ ...bgStyle, padding: `${(padding_y || 0) * 4}px ${(padding_x || 0) * 4}px` }}
      className="w-full transition-all duration-300"
    >
      <div style={{ maxWidth: containerMap[container] || '1280px', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  );
};

export default AdminSection;