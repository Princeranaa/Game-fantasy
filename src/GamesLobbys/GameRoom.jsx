import React from "react";
import table from "../assets/GameSection/game-table.png";
import GamePlay from "../assets/Loading/Game-Play.png";

const GameTable = () => {
  const players = [
    { id: 1, name: "DEMO1", points: 10, position: "left-middle" },
    { id: 2, name: "Alex", points: 10, position: "top-left" },
    { id: 3, name: "MARK", points: 10, position: "top-center" },
    { id: 4, name: "Botplayer", points: 10, position: "top-right" },
    { id: 5, name: "Kevin", points: 10, position: "right-middle" },
    { id: 6, name: "You", points: 49, position: "bottom-center" },
  ];

  const getPositionClasses = (pos) => {
    switch (pos) {
      case "top-left":
        return "top-[12%] left-[25%] -translate-x-1/2 -translate-y-1/2";
      case "top-center":
        return "top-[12%] left-1/2 -translate-x-1/2 -translate-y-1/2";
      case "top-right":
        return "top-[12%] left-[75%] -translate-x-1/2 -translate-y-1/2";
      case "left-middle":
        return "top-[50%] left-[3%] -translate-x-1/2 -translate-y-1/2";
      case "right-middle":
        return "top-[50%] right-[3%] translate-x-1/2 -translate-y-1/2";
      default:
        return "";
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden font-sans">
      {/* 1. BACKGROUND */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${GamePlay})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 2. GAME TABLE */}
      <div className="relative z-10 w-full max-w-[900px] aspect-[2/1] flex items-center justify-center mx-12">
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ backgroundImage: `url(${table})` }}
        />
        <h1 className="relative text-white text-4xl md:text-6xl font-black   ">
          Waiting.....
        </h1>

        {/* 3. OTHER PLAYERS (Excluding "You") */}
        {players
          .filter((p) => p.name !== "You")
          .map((player) => (
            <div
              key={player.id}
              className={`absolute flex flex-col items-center z-20 ${getPositionClasses(player.position)}`}
              style={{ width: "74.36px", height: "87.09px" }}
            >
              <span className="text-[9px] text-yellow-400 font-bold mb-1">
                Points: {player.points}
              </span>
              <div className="relative w-[55px] h-[55px] rounded-full border-[1.5px] border-cyan-400 bg-black/80 shadow-[0_0_10px_rgba(34,211,238,0.4)] overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-[-4px] z-10 w-full bg-gradient-to-b from-gray-900 to-black border border-white/20 px-1 py-0.5 rounded shadow-lg text-center">
                <span className="text-white text-[10px] font-black uppercase truncate block">
                  {player.name}
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* 4. BOTTOM PERSISTENT BAR (The "Bottom Table" UI) */}
      <div className="fixed bottom-0 w-full max-w-[812px] h-[65px] z-50 flex items-center justify-between px-4">
        {/* Left Placeholder */}
        <div className="w-1/4"></div>

        {/* Center: Your Info Box */}
        <div className="relative flex items-center h-full min-w-[200px]">

          {/* Glassmorphism Background Box */}
          <div className="absolute inset-0 bg-black/80 border-t border-x border-white/20 rounded-t-[25px] backdrop-blur-md" />

          <div className="relative flex items-center justify-between px-6 gap-4">
            {/* Your Avatar (Overlapping) */}
            <div className="w-14 h-14 rounded-full border-2 border-white bg-gray-900 overflow-hidden -translate-y-7 translate-x-10 shadow-2xl">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                alt="Me" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Your Points */}
            <div className="absolute flex flex-col gap-1 -translate-y-2 translate-x-30">
              <span className="text-[9px] text-gray-400 uppercase font-black">
                Points
              </span>
              <span className="text-xl text-white font-black leading-none">
                49
              </span>
            </div>

          </div>
        </div>

        {/* Right: Sort/Group Buttons */}
        <div className="w-1/4 flex gap-2 justify-end">
          <button className="relative group active:scale-90 transition-all">
            <div className="absolute inset-0 bg-orange-500 rounded-full blur-sm opacity-50"></div>
            {/* <div className="relative bg-gradient-to-b from-yellow-400 to-orange-600 border border-yellow-200 px-4 py-1.5 rounded-full text-black font-black italic text-[10px] shadow-lg">
              SORT
            </div> */}
          </button>
          <button className="relative group active:scale-90 transition-all">
            <div className="absolute inset-0 bg-cyan-500 rounded-full blur-sm opacity-50"></div>
            {/* <div className="relative bg-gradient-to-b from-cyan-300 to-cyan-600 border border-white/40 px-4 py-1.5 rounded-full text-black font-black italic text-[10px] shadow-lg">
              GROUP
            </div> */}
          </button>
        </div>
      </div>

      {/* Bottom Dark Gradient Glow */}
      {/* <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none opacity-90 z-40" /> */}
    </div>
  );
};

export default GameTable;
