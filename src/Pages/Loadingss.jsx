import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GamePlay from '../assets/Loading/Game-Play.png';
import FocusLogo from '../assets/Loading/focus-group 2.png';
import RummyPlay from '../assets/Loading/Frame 1261152773.png';

const Loadingss = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Standard game asset loading simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment to make it look like it's actually "loading" files
        const increment = Math.floor(Math.random() * 5) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    const timer = setTimeout(() => {
      navigate("/login");
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-[#064e3b]">
      
      {/* 1. Background Pattern (Felt Texture) */}
      <div 
        className="absolute inset-0 z-0 opacity-40 scale-110"
        style={{ 
          backgroundImage: `url(${GamePlay})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      />

      {/* 2. Portrait Warning */}
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white text-center p-10 lg:hidden landscape:hidden">
        <div className="animate-bounce mb-4 text-4xl">🔄</div>
        <h2 className="text-xl font-black italic uppercase tracking-tighter text-yellow-500">Rotate to Play</h2>
      </div>

      {/* 3. Loading Content Container */}
      <div className="z-10 flex flex-col items-center justify-between h-full w-full max-w-4xl py-12 px-8">
        
        {/* Top Spacer for balance */}
        <div className="hidden md:block"></div>

        {/* Center: Branding with Pulse effect */}
        <div className="flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-700">
            <img 
                src={FocusLogo} 
                alt="Game Icon" 
                className="w-24 md:w-36 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)] animate-pulse"
            />
            <img 
                src={RummyPlay} 
                alt="Rummy Earn While You Play" 
                className="w-64 md:w-[500px] object-contain drop-shadow-xl"
            />
        </div>

        {/* Bottom: Progress Section */}
        <div className="w-full max-w-md md:max-w-xl space-y-3">
            <div className="flex justify-between items-end px-2">
                <span className="text-orange-500 font-black italic tracking-[0.2em] text-xs sm:text-sm animate-pulse">
                    SYNCING CARDS...
                </span>
                <span className="text-white font-black italic text-lg">
                    {progress}%
                </span>
            </div>
            
            {/* Glossy Progress Bar Container */}
            <div className="relative w-full h-5 md:h-7 bg-black/60 rounded-full border-2 border-yellow-500/40 p-[3px] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                {/* The Striped Orange Loading Fill */}
                <div 
                    className="h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_15px_rgba(249,115,22,0.6)]"
                    style={{ 
                        width: `${progress}%`,
                        backgroundImage: 'linear-gradient(45deg, #f97316 25%, #ea580c 25%, #ea580c 50%, #f97316 50%, #f97316 75%, #ea580c 75%, #ea580c 100%)',
                        backgroundSize: '30px 30px'
                    }}
                />
                
                {/* Glossy shine on the bar */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-full blur-[1px]"></div>
            </div>

            <div className="text-center">
                <p className="text-white/30 text-[9px] uppercase tracking-[0.3em] font-bold">
                    Secure Server Connection | Region: India
                </p>
            </div>
        </div>
      </div>

      {/* Decorative Bottom Shadow for depth */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default Loadingss;