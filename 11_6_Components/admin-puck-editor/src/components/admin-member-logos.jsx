import React from 'react';

const AdminMemberLogos = (props) => {

const {
title,
titleColor,
titleSize,
titleAlign,
overlay,
speed = 20,
hoverEffect = 'zoom',
logoWidth = 220,
logoHeight = 130,
cardRadius = 24,
logos = [],
background
} = props;
const getBackgroundStyle = () => {
if (background?.type === 'gradient') {
  return {
    background: `linear-gradient(
      ${background.gradientDirection || 'to right'},
      ${background.gradientFrom || '#dff4ff'},
      ${background.gradientTo || '#ffffff'}
    )`
  };
}
if (
  background?.type === 'image' &&
  background.imageUrl
) {
  return {
    backgroundImage: `url(${background.imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };
}

return {
  backgroundColor:
    background?.color || '#dff4ff'
};

};

const hoverClass =
hoverEffect === 'lift'
? 'hover:-translate-y-3'
: hoverEffect === 'rotate'
? 'hover:rotate-3'
: 'hover:scale-110';
const titleSizeMap = {
  sm: 'text-2xl',
  base: 'text-3xl',
  lg: 'text-4xl',
  xl: 'text-5xl',
  '2xl': 'text-6xl'
};
// Nhân đôi danh sách để tạo hiệu ứng vô hạn
const duplicatedLogos = [
...logos,
...logos,
...logos
];

return ( <section
  className="relative py-20 overflow-hidden" 
   style={getBackgroundStyle()}
 >

  <div className="max-w-7xl mx-auto px-auto">

    {title && (
<h2
    className={`
        ${titleSizeMap[titleSize] || 'text-5xl'}
        font-bold
        mb-12
    `}
    style={{
        color: titleColor,
        textAlign: titleAlign
    }}
    >
            {title}
      </h2>
    )}

   <div className="overflow-hidden relative">

  {/* Fade trái */}
  <div
    className="absolute left-0 top-0 z-20 h-full w-40 pointer-events-none"
    style={{
      background:
        'linear-gradient(to right, #88D5EC, rgba(223,244,255,0))'
    }}
  />

  {/* Fade phải */}
  <div
    className="absolute right-0 top-0 z-20 h-full w-40 pointer-events-none"
    style={{
      background:
        'linear-gradient(to left, #F3E7FC, rgba(223,244,255,0))'
    }}
  />

      <div
        className="logo-track"
        style={{
          animationDuration: `${speed}s`
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = 'paused';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = 'running';
        }}
      >

        {duplicatedLogos.map((logo, index) => (

          <div
            key={index}
            className={`
              logo-card
              bg-white
              flex
              items-center
              justify-center
              shadow-md
              transition-all
              duration-300
              cursor-pointer
              shrink-0
              ${hoverClass}
            `}
            style={{
              width: `${logoWidth}px`,
              height: `${logoHeight}px`,
              borderRadius: `${cardRadius}px`
            }}
          >

            <img
              src={logo.imageUrl}
              alt={logo.alt || ''}
              className="
                max-w-[80%]
                max-h-[80%]
                object-contain
              "
            />

          </div>

        ))}

      </div>

    </div>

  </div>

  <style>{`

    .logo-track {
      display: flex;
      gap: 32px;
      width: max-content;
      animation-name: marquee;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      will-change: transform;
    }

    .logo-card:hover {
      box-shadow:
        0 20px 40px rgba(0,0,0,.15);
    }

    @keyframes marquee {

      from {
        transform: translateX(0);
      }

      to {
        transform: translateX(calc(-50%));
      }

    }
    
  `}</style>

</section>

);
};

export default AdminMemberLogos;
