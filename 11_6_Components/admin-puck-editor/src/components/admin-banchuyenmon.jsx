import React from 'react';

const AdminBanChuyenMon = (props) => {
  
  const sectionTitle = props.sectionTitle ?? props.puck?.render?.sectionTitle;
  const sectionSubtitle = props.sectionSubtitle ?? props.puck?.render?.sectionSubtitle;
  const cards = props.cards ?? props.puck?.render?.cards ?? [];
  const background = props.background ?? props.puck?.render?.background;
  
  const getBackgroundStyle = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || 'to bottom right'}, ${bg.gradientFrom || '#e0f2fe'}, ${bg.gradientTo || '#e0e7ff'})` };
    }
    if ((bg.type === 'image' || bg.type === 'gif') && bg.imageUrl) {
      return { 
        backgroundImage: `url('${bg.imageUrl}')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return { backgroundColor: bg.color || '#f3f4f6' };
  };
  const getOverlayStyle = () => {
  const bg = background || {};

  if (!bg.overlayEnable) return {};

  return {
    background: `linear-gradient(
      ${bg.overlayDirection || "to right"},
      ${bg.overlayFrom || "rgba(0,0,0,.5)"},
      ${bg.overlayTo || "rgba(0,0,0,.2)"}
    )`,
    opacity: bg.overlayOpacity ?? 1
  };
};
  return (
    <section className="relative w-full py-20 px-6 overflow-hidden transition-all duration-300" style={getBackgroundStyle()}>
      <div className="relative z-10 max-w-7xl mx-auto">
        {
        background?.overlayEnable && (
          <div
            className="absolute inset-0 z-0"
            style={getOverlayStyle()}
          />
        )
      }
        {}
        <div className="text-center mb-16">
          {sectionTitle && (
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 uppercase tracking-wider mb-2">
              {sectionTitle}
            </h2>
          )}
          {sectionSubtitle && (
            <p className="text-sm md:text-base font-semibold text-blue-700 uppercase tracking-wide opacity-90">
              {sectionSubtitle}
            </p>
          )}
        </div>

        {}
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {cards.map((card, idx) => {
  
            const radiusValue = card.cardBorderRadius !== undefined ? card.cardBorderRadius : 40;
            
            return (
              <div 
                key={idx}
                className="relative w-full sm:w-[280px] bg-gradient-to-b from-blue-500 to-blue-600 p-6 flex flex-col items-center justify-between shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{

                  borderRadius: card.styleType === 'round' 
                    ? `${radiusValue}px` 
                    : `${radiusValue}px 0px ${radiusValue}px 0px`
                }}
              >
                <div className="flex flex-col items-center text-center w-full mt-4">
                  {}
                  {card.iconUrl ? (
                    <img 
                      src={card.iconUrl} 
                      alt={card.title || 'Icon'} 
                      className="w-16 h-16 object-contain mb-5 filter brightness-0 invert" 
                    />
                  ) : (
                    <div className="w-16 h-16 border-2 border-dashed border-white/50 rounded-full mb-5 flex items-center justify-center text-white/70 text-xs">
                      No Icon
                    </div>
                  )}

                  {}
                  {card.title && (
                    <h3 className="text-lg font-bold text-white leading-snug mb-6 px-2 min-h-[50px] flex items-center justify-center">
                      {card.title}
                    </h3>
                  )}
                </div>

                {}
                {card.buttonText && (
                  <a
                    href={card.buttonUrl || '#'}
                    className="w-full max-w-[180px] py-2 px-4 text-xs font-medium text-white border border-white/40 bg-white/10 text-center transition-all duration-200 hover:bg-white hover:text-blue-600 shadow-sm mb-2"
                    style={{
                      borderRadius: `${card.btnBorderRadius ?? 999}px`
                    }}
                  >
                    {card.buttonText}
                  </a>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
    
  );
};

export default AdminBanChuyenMon;