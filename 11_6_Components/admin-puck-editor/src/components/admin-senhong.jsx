import React from 'react';

const AdminSenHong = (props) => {

  const topText = props.topText ?? props.puck?.render?.topText; 
  const title = props.title ?? props.puck?.render?.title; 
  const titleColor = props.titleColor ?? props.puck?.render?.titleColor; 
  const titleSize = props.titleSize ?? props.puck?.render?.titleSize; 
  const subtitle = props.subtitle ?? props.puck?.render?.subtitle; 
  const subtitleColor = props.subtitleColor ?? props.puck?.render?.subtitleColor; 
  const subtitleSize = props.subtitleSize ?? props.puck?.render?.subtitleSize; 
  const buttons = props.buttons ?? props.puck?.render?.buttons; 
  const background = props.background ?? props.puck?.render?.background; 
  const layout = props.layout ?? props.puck?.render?.layout;
  const cardStyle = props.cardStyle ?? props.puck?.render?.cardStyle;

  const alignFlex = layout?.align === 'left' ? 'justify-start' : layout?.align === 'right' ? 'justify-end' : 'justify-center';
  const alignItems = layout?.align === 'left' ? 'items-start' : layout?.align === 'right' ? 'items-end' : 'items-center';

  const getBackgroundStyle = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || 'to bottom right'}, ${bg.gradientFrom || '#667eea'}, ${bg.gradientTo || '#764ba2'})` };
    }
    if ((bg.type === 'image' || bg.type === 'gif') && bg.imageUrl) {
      return { 
        backgroundImage: `url('${bg.imageUrl}')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return { backgroundColor: bg.color || '#1e3a8a' };
  };

  const titleSizeMap = { 'sm': 'text-2xl', 'base': 'text-4xl', 'lg': 'text-5xl', 'xl': 'text-6xl', '2xl': 'text-7xl' };
  const subtitleSizeMap = { 'sm': 'text-sm', 'base': 'text-base', 'lg': 'text-lg', 'xl': 'text-xl' };

const cardBorderRadiusStyle = {
  borderTopLeftRadius:
    `${cardStyle?.topLeftRadius ?? 40}px`,

  borderTopRightRadius:
    `${cardStyle?.topRightRadius ?? 120}px`,

  borderBottomRightRadius:
    `${cardStyle?.bottomRightRadius ?? 40}px`,

  borderBottomLeftRadius:
    `${cardStyle?.bottomLeftRadius ?? 120}px`
};

  return (
    <section className="relative w-full py-24 px-6 min-h-[580px] flex items-center transition-all duration-300" style={getBackgroundStyle()}>
      <div className={`relative mx-auto w-full max-w-7xl flex ${alignFlex} ${alignItems}`}>
        
        {}
        <div 
          className="backdrop-blur-md bg-white/10 border border-white/20 p-8 md:p-12 max-w-xl w-full shadow-2xl transition-all duration-300"
          style={{
          ...cardBorderRadiusStyle,
           textAlign: layout?.align || 'left'
            }}
        >
          {}
          {topText && (
            <p className="text-xs md:text-sm font-bold tracking-widest uppercase mb-2 text-white/80">
              {topText}
            </p>
          )}

          {}
          {title && (
            <h1 className={`${titleSizeMap[titleSize] || 'text-6xl'} font-bold mb-4 tracking-wide`} style={{ color: titleColor }}>
              {title}
            </h1>
          )}
          
          {}
          {subtitle && (
            <p className={`${subtitleSizeMap[subtitleSize] || 'text-base'} mb-6 text-white/90 whitespace-pre-line leading-relaxed text-justify`} style={{ color: subtitleColor }}>
              {subtitle}
            </p>
          )}
          
          {}
          {buttons && buttons.length > 0 && (
            <div className={`flex flex-wrap gap-4 ${alignFlex}`}>
              {buttons.map((btn, idx) => (
                <a 
                  key={idx} 
                  href={btn.url || '#'} 
                  className="inline-flex items-center justify-center px-6 py-2.5 font-medium transition-all shadow-md hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: btn.bgColor || '#3b82f6',
                    color: btn.textColor || '#ffffff',
                    borderRadius: `${btn.borderRadius ?? 999}px`
                  }}
                >
                  {btn.text}
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default AdminSenHong;