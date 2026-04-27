import React, { useState } from "react";
import table from "../assets/GameSection/game-table.png";
import GamePlay from "../assets/Loading/Game-Play.png";

const GameTable = () => {
  const [gameStarted, setGameStarted] = useState(true);

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

  // Modern Card Component with Suit Colors
  const Card = ({ value, suit, isRed = false }) => (
    <div className="w-[38px] h-[52px] bg-white rounded-md border border-gray-300 shadow-sm flex flex-col p-1 relative select-none">
      <span
        className={`text-[11px] font-bold leading-none ${isRed ? "text-red-600" : "text-black"}`}
      >
        {value}
      </span>
      <span className={`text-sm ${isRed ? "text-red-600" : "text-black"}`}>
        {suit}
      </span>
    </div>
  );

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-[#064e3b] overflow-hidden font-sans">
      {/* 1. BACKGROUND */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${GamePlay})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* SCALE WRAPPER */}
      <div className="relative z-10 flex items-center justify-center scale-[0.6] sm:scale-[0.8] md:scale-105 lg:scale-130 transition-transform duration-300">
        <div
          className="relative flex items-center justify-center"
          style={{ width: "650px", height: "350.47px" }}
        >
          {/* Table Image */}
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
            style={{
              backgroundImage: `url(${table})`,
              backgroundSize: "100% 100%",
            }}
          />

          {!gameStarted ? (
            <h1
              className="relative text-white text-4xl font-black select-none cursor-pointer"
              onClick={() => setGameStarted(true)}
            >
              Waiting.....
            </h1>
          ) : (
            /* CENTER GAMEPLAY SECTION */
            <div
              className="absolute z-30 flex flex-col items-center justify-between"
              style={{ width: "400px", height: "174px", top: "115px" }}
            >
              {/* TOP ROW: DRAW PILE (OVERLAPPING) & DISCARD PILE */}
              <div className="flex items-center justify-center gap-16 w-full">
                {/* Left: Draw Pile Group */}
                <div className="relative flex items-center w-20">
                  {/* Wild Card (Face Up 9) */}
                  <div className="absolute left-0 -rotate-12">
                    <Card value="9" suit="♠" />
                  </div>
                  {/* Face Down Deck (Blue) */}
                  <div className="absolute left-4 w-[42px] h-[56px] bg-[#5b89d8] rounded-md border-2 border-white shadow-lg flex items-center justify-center">
                    <div className="w-[30px] h-[44px] border border-white/40 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xl opacity-40">♠</span>
                    </div>
                  </div>
                </div>

                {/* Right: Discard Pile */}
                <div className="relative">
                  <Card value="J" suit="♣" />
                </div>
              </div>

              {/* BOTTOM ROW: BRACKETED HAND GROUPS */}
              <div className="flex items-end gap-4 h-24">
                {/* Pure Sequence */}
                <div className="flex flex-col items-center">
                  <div className="flex -space-x-7">
                    <Card value="K" suit="♠" />
                    <Card value="Q" suit="♠" />
                    <Card value="J" suit="♠" />
                    <Card value="10" suit="♠" />
                  </div>
                  <div className="w-full bg-[#1da05a] text-[7px] text-white font-bold text-center py-0.5 rounded-b-sm mt-1 uppercase">
                    Pure Sequence
                  </div>
                </div>

                {/* Sequence */}
                <div className="flex flex-col items-center">
                  <div className="flex -space-x-7">
                    <Card value="8" suit="♥" isRed />
                    <Card value="9" suit="♥" isRed />
                    <Card value="10" suit="♥" isRed />
                  </div>
                  <div className="w-full bg-[#e68d1e] text-[7px] text-white font-bold text-center py-0.5 rounded-b-sm mt-1 uppercase">
                    Sequence
                  </div>
                </div>

                {/* Invalid */}
                <div className="flex flex-col items-center">
                  <div className="flex -space-x-7">
                    <Card value="A" suit="♣" />
                    <Card value="10" suit="♦" isRed />
                    <Card value="J" suit="♣" />
                    <Card value="3" suit="♥" isRed />
                    <Card value="6" suit="♠" />
                    <Card value="K" suit="♦" isRed />
                  </div>
                  <div className="w-full bg-[#d32f2f] text-[7px] text-white font-bold text-center py-0.5 rounded-b-sm mt-1 uppercase">
                    Invalid
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PLAYERS LAYER */}
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
                <div className="relative w-[55px] h-[55px] rounded-full border-[1.5px] border-cyan-400 bg-black/90 shadow-[0_0_15px_rgba(34,211,238,0.5)] overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`}
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-[-4px] z-10 w-full bg-gradient-to-b from-gray-800 to-black border border-white/10 px-1 py-0.5 rounded shadow-xl text-center">
                  <span className="text-white text-[10px] font-black uppercase tracking-tighter truncate block">
                    {player.name}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-[712px] h-[55px] z-50 flex items-center justify-between px-4">
        <div className="w-1/4" />
        <div className="relative flex items-center h-full min-w-[200px]">
          <div className="absolute inset-0 bg-black/80 border-t border-x border-white/20 rounded-t-[25px] backdrop-blur-md" />
          <div className="relative flex items-center justify-between px-6 gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-white bg-gray-900 overflow-hidden -translate-y-7 translate-x-10 shadow-2xl">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                alt="Me"
                className="w-full h-full object-cover"
              />
            </div>
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
        <div className="w-1/4 flex gap-2 justify-end">
          <button className="bg-yellow-500 text-[10px] font-bold px-4 py-1 rounded-full shadow-lg">
            SORT
          </button>
          <button className="bg-cyan-500 text-[10px] font-bold px-4 py-1 rounded-full shadow-lg text-white">
            GROUP
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameTable;
