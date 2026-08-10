import React, { useState, useEffect } from 'react';
import banner1 from '../assets/banner 1.webp';
import banner2 from '../assets/banner 2.webp';
const AdminHero = ({ slides = [] }) => {
  const defaultSlides = [banner1, banner2];
  const validSlides = slides && slides.length > 0 ? slides.filter(s => {
    const url = typeof s === 'string' ? s : s?.imageUrl;
    return url && url.trim() !== '';
  }) : [];
  const finalSlides = validSlides.length > 0 ? validSlides : defaultSlides;
  const len = finalSlides.length;
  const MULTIPLIER = 50;
  const multipliedSlides = Array(MULTIPLIER).fill(finalSlides).flat();
  const startIndex = Math.floor(MULTIPLIER / 2) * len;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    setIsAnimating(false);
    setCurrentIndex(startIndex);
  }, [len, startIndex]);
  const prevSlide = () => {
    setIsAnimating(true);
    setCurrentIndex(prev => prev - 1);
  };
  const nextSlide = () => {
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);
  };
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [len, isPaused]);
  useEffect(() => {
    if (!isAnimating) {
      const timeout = setTimeout(() => setIsAnimating(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  const handleTransitionEnd = () => {
    const offset = ((currentIndex % len) + len) % len;
    const centerIndex = startIndex + offset;
    if (currentIndex !== centerIndex) {
      setIsAnimating(false); 
      setCurrentIndex(centerIndex);
    }
  };
  return (
    <div 
      className="relative w-full overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {}
      <div 
        className={`flex items-center ${isAnimating ? 'transition-transform duration-700 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {multipliedSlides.map((slide, index) => {
          const imgUrl = typeof slide === 'string' ? slide : slide.imageUrl;

          return (
            <div key={index} className="w-full flex-shrink-0">
              <img 
                src={imgUrl} 
                alt={`Banner ${index}`} 
                className="w-full h-auto object-cover"
              />
            </div>
          );
        })}
      </div>
      {}
      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full border-[1.5px] border-white text-white opacity-80 hover:opacity-100 hover:bg-white/20 transition-all z-10 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      {}
      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full border-[1.5px] border-white text-white opacity-80 hover:opacity-100 hover:bg-white/20 transition-all z-10 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-10">
        {finalSlides.map((_, dotIndex) => {
          const currentRealIndex = ((currentIndex % len) + len) % len;
          return (
            <button
              key={dotIndex}
              onClick={() => {
                setIsAnimating(true);
                setCurrentIndex(currentIndex + (dotIndex - currentRealIndex));
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentRealIndex === dotIndex 
                  ? 'bg-white border-2 border-white scale-110'
                  : 'bg-transparent border-2 border-white opacity-60 hover:opacity-100' 
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminHero;
