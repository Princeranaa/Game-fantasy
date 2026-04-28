import React from "react";

const WaitingScreen = ({ status, canStart, onStartGame }) => {
  return (
    <div className="relative flex flex-col items-center">
      <h1 className="select-none text-4xl font-black text-white">
        Waiting.....
      </h1>

      <p className="mt-3 text-sm font-bold uppercase tracking-widest text-white/60">
        {status}
      </p>

      {canStart && (
        <button
          onClick={onStartGame}
          className="mt-5 rounded-full bg-yellow-500 px-8 py-3 text-sm font-black uppercase text-black shadow-xl"
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default WaitingScreen;