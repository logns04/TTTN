import React from 'react';

const AdminAboutStructure = (props) => {

  const columns = props.columns ?? props.puck?.render?.columns ?? [];
  const background = props.background ?? props.puck?.render?.background;

  const getBackgroundStyle = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || 'to bottom right'}, ${bg.gradientFrom || '#e0e7ff'}, ${bg.gradientTo || '#f3e8ff'})` };
    }
    if ((bg.type === 'image' || bg.type === 'gif') && bg.imageUrl) {
      return { 
        backgroundImage: `url('${bg.imageUrl}')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return { backgroundColor: bg.color || '#f1f5f9' };
  };

  return (
    <section className="relative w-full py-16 px-6 min-h-[600px] transition-all duration-300" style={getBackgroundStyle()}>
      <div className="max-w-7xl mx-auto">
        
        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 items-start">
          {columns.map((col, colIdx) => (
            <div 
              key={colIdx} 
              className="w-full bg-white text-slate-800 p-8 md:p-10 shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl border border-slate-100"
              style={{
                borderRadius: `${col.cardBorderRadius ?? 16}px`
              }}
            >
              {}
              <div>
                {col.title && (
                  <h2 className="text-xl md:text-2xl font-bold text-blue-900 uppercase tracking-wide mb-6 border-l-4 border-blue-600 pl-3">
                    {col.title}
                  </h2>
                )}

                {col.text && (
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6 text-justify whitespace-pre-line">
                    {col.text}
                  </p>
                )}
              </div>

              {}
              {col.members && col.members.length > 0 && (
                <div className="space-y-4 mt-2 w-full">
                  {col.members.map((member, memIdx) => (
                    <div 
                      key={memIdx} 
                      className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors duration-200"
                    >
                      {}
                      <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-100 bg-slate-200 shadow-sm">
                        {member.avatarUrl ? (
                          <img 
                            src={member.avatarUrl} 
                            alt={member.name || 'Avatar'} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Img</div>
                        )}
                      </div>

                      {}
                      <div className="flex-1 text-center sm:text-left space-y-0.5">
                        {member.name && (
                          <div className="text-base font-bold text-slate-800">
                            Họ tên: <span className="font-semibold text-slate-700">{member.name}</span>
                          </div>
                        )}
                        {member.clbRole && (
                          <div className="text-sm font-bold text-blue-800">
                            Chức vụ CLB: <span className="font-medium text-blue-700">{member.clbRole}</span>
                          </div>
                        )}
                        {member.bizRole && (
                          <div className="text-sm font-bold text-slate-800">
                            Chức vụ Doanh nghiệp: <span className="font-medium text-slate-600">{member.bizRole}</span>
                          </div>
                        )}
                        {member.company && (
                          <div className="text-sm font-bold text-slate-800">
                            Doanh nghiệp: <span className="font-medium text-slate-600">{member.company}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {}
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <button className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 text-sm font-bold">‹</button>
                    <div className="flex gap-1.5">
                      <span className="w-6 h-1.5 rounded-full bg-blue-600"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    </div>
                    <button className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 text-sm font-bold">›</button>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AdminAboutStructure;