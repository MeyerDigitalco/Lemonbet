import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bannerSlides = [
  {
    id: 1,
    title: "SEASON STARTED!",
    subtitle: "Catch the best European matches",
    buttonText: "BET AND WIN BIG!",
    image: "https://images.unsplash.com/photo-1767729790212-661953ecaa90?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmb290YmFsbCUyMHN0YWRpdW0lMjBFdXJvcGVhbiUyMHNwb3J0c3xlbnwwfHx8fDE3Njg2NzQ4MTN8MA&ixlib=rb-4.1.0&q=85",
    leagues: ["⚽", "🏆", "⚡", "🎯"]
  },
  {
    id: 2,
    title: "LIVE BETTING!",
    subtitle: "Bet on live matches now",
    buttonText: "JOIN THE ACTION!",
    image: "https://images.unsplash.com/photo-1747213286331-0f00410a62e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxzb2NjZXIlMjBmb290YmFsbCUyMHN0YWRpdW0lMjBFdXJvcGVhbiUyMHNwb3J0c3xlbnwwfHx8fDE3Njg2NzQ4MTN8MA&ixlib=rb-4.1.0&q=85",
    leagues: ["🏅", "⭐", "💫", "🔥"]
  },
  {
    id: 3,
    title: "CHAMPIONS LEAGUE!",
    subtitle: "Watch the biggest games",
    buttonText: "BET NOW!",
    image: "https://images.unsplash.com/photo-1747213286332-b9b1d79cf889?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxzb2NjZXIlMjBmb290YmFsbCUyMHN0YWRpdW0lMjBFdXJvcGVhbiUyMHNwb3J0c3xlbnwwfHx8fDE3Njg2NzQ4MTN8MA&ixlib=rb-4.1.0&q=85",
    leagues: ["🎪", "🎨", "🌟", "✨"]
  },
  {
    id: 4,
    title: "PREMIER LEAGUE!",
    subtitle: "Top English football action",
    buttonText: "PLACE YOUR BET!",
    image: "https://images.unsplash.com/photo-1767729790212-661953ecaa90?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmb290YmFsbCUyMHN0YWRpdW0lMjBFdXJvcGVhbiUyMHNwb3J0c3xlbnwwfHx8fDE3Njg2NzQ4MTN8MA&ixlib=rb-4.1.0&q=85",
    leagues: ["👑", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "⚡", "🎭"]
  },
  {
    id: 5,
    title: "LA LIGA FEVER!",
    subtitle: "Spanish football excellence",
    buttonText: "START BETTING!",
    image: "https://images.unsplash.com/photo-1747213286331-0f00410a62e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxzb2NjZXIlMjBmb290YmFsbCUyMHN0YWRpdW0lMjBFdXJvcGVhbiUyMHNwb3J0c3xlbnwwfHx8fDE3Njg2NzQ4MTN8MA&ixlib=rb-4.1.0&q=85",
    leagues: ["🇪🇸", "⭐", "🎯", "🏆"]
  },
  {
    id: 6,
    title: "BUNDESLIGA ACTION!",
    subtitle: "German football at its best",
    buttonText: "BET TODAY!",
    image: "https://images.unsplash.com/photo-1747213286332-b9b1d79cf889?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxzb2NjZXIlMjBmb290YmFsbCUyMHN0YWRpdW0lMjBFdXJvcGVhbiUyMHNwb3J0c3xlbnwwfHx8fDE3Njg2NzQ4MTN8MA&ixlib=rb-4.1.0&q=85",
    leagues: ["🇩🇪", "⚽", "💪", "🔥"]
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      const next = (currentSlide + 1) % bannerSlides.length;
      setNextSlide(next);
      
      setTimeout(() => {
        setCurrentSlide(next);
        setIsAnimating(false);
      }, 800);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      const prev = (currentSlide - 1 + bannerSlides.length) % bannerSlides.length;
      setNextSlide(prev);
      
      setTimeout(() => {
        setCurrentSlide(prev);
        setIsAnimating(false);
      }, 800);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left - go to next slide
      handleNext();
    }
    
    if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right - go to previous slide
      handlePrev();
    }
  };

  const slide = bannerSlides[currentSlide];
  const nextSlideData = bannerSlides[nextSlide];

  return (
    <div 
      data-testid="hero-banner"
      className="relative mt-16 h-[400px] overflow-hidden bg-gradient-to-r from-[#2a2a2d] to-[#1a1a1d]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Current Slide - Slides out to LEFT */}
      <div 
        className="absolute inset-0"
        style={{
          transform: isAnimating ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.8s ease-in-out',
          opacity: 1
        }}
      >
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${slide.image})`
          }}
        />
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-between px-12">
          {/* Center Content */}
          <div className="flex-1 flex items-center justify-between px-20">
            {/* Text Content */}
            <div className="z-10 max-w-xl">
              <p className="text-white text-lg mb-2 font-medium" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                {slide.subtitle}
              </p>
              <h1 
                className="text-6xl font-black mb-6 text-[#7bff00]"
                style={{ 
                  fontFamily: 'Work Sans, sans-serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  letterSpacing: '0.02em'
                }}
              >
                {slide.title}
              </h1>
              <button
                data-testid="banner-cta-button"
                className="px-8 py-3 rounded-full text-black font-bold text-lg hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #7bff00 0%, #c3ff00 100%)',
                  transition: 'transform 0.3s',
                  boxShadow: '0 4px 15px rgba(123, 255, 0, 0.3)'
                }}
              >
                {slide.buttonText}
              </button>
            </div>

            {/* Characters and Leagues */}
            <div className="z-10 flex items-center gap-8">
              {/* Decorative Lemon */}
              <div className="text-8xl opacity-80">🍋</div>
              
              {/* League Icons */}
              <div className="flex flex-col gap-4">
                {slide.leagues.map((league, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-lg bg-[#7bff00]/20 backdrop-blur-sm flex items-center justify-center text-2xl border border-[#7bff00]/30"
                  >
                    {league}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Slide - Slides in from RIGHT */}
      {isAnimating && (
        <div 
          className="absolute inset-0"
          style={{
            transform: 'translateX(0)',
            transition: 'transform 0.8s ease-in-out',
            opacity: 1
          }}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url(${nextSlideData.image})`
            }}
          />
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-between px-12">
            {/* Center Content */}
            <div className="flex-1 flex items-center justify-between px-20">
              {/* Text Content */}
              <div className="z-10 max-w-xl">
                <p className="text-white text-lg mb-2 font-medium" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  {nextSlideData.subtitle}
                </p>
                <h1 
                  className="text-6xl font-black mb-6 text-[#7bff00]"
                  style={{ 
                    fontFamily: 'Work Sans, sans-serif',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    letterSpacing: '0.02em'
                  }}
                >
                  {nextSlideData.title}
                </h1>
                <button
                  className="px-8 py-3 rounded-full text-black font-bold text-lg hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #7bff00 0%, #c3ff00 100%)',
                    transition: 'transform 0.3s',
                    boxShadow: '0 4px 15px rgba(123, 255, 0, 0.3)'
                  }}
                >
                  {nextSlideData.buttonText}
                </button>
              </div>

              {/* Characters and Leagues */}
              <div className="z-10 flex items-center gap-8">
                {/* Decorative Lemon */}
                <div className="text-8xl opacity-80">🍋</div>
                
                {/* League Icons */}
                <div className="flex flex-col gap-4">
                  {nextSlideData.leagues.map((league, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 rounded-lg bg-[#7bff00]/20 backdrop-blur-sm flex items-center justify-center text-2xl border border-[#7bff00]/30"
                    >
                      {league}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Left Arrow */}
      <button
        data-testid="banner-prev-button"
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-[#7bff00] text-white hover:text-black backdrop-blur-sm"
        style={{ transition: 'background-color 0.3s, color 0.3s' }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        data-testid="banner-next-button"
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-[#7bff00] text-white hover:text-black backdrop-blur-sm"
        style={{ transition: 'background-color 0.3s, color 0.3s' }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            data-testid={`banner-indicator-${index}`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                const targetIndex = index;
                setNextSlide(targetIndex);
                setTimeout(() => {
                  setCurrentSlide(targetIndex);
                  setIsAnimating(false);
                }, 800);
              }
            }}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-[#7bff00] w-8" : "bg-white/30"
            }`}
            style={{ transition: 'all 0.3s' }}
          />
        ))}
      </div>

      {/* Pause Indicator */}
      {isPaused && (
        <div 
          data-testid="banner-paused-indicator"
          className="absolute top-6 right-6 z-20 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs font-semibold flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 bg-[#7bff00] rounded-full"></span>
          PAUSED
        </div>
      )}
    </div>
  );
};

export default HeroBanner;
