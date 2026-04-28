import React from "react";
import { useParams } from "react-router-dom";

import table from "../assets/GameSection/game-table.png";
import GamePlay from "../assets/Loading/Game-Play.png";

import { useGameRoomSocket } from "../hooks/useGameRoomSocket ";
import { getPositionClasses } from "../Utils/gameRoomPositions";

import Card from "../GamesLobbys/Card";
import WaitingScreen from "../GamesLobbys/WaitingScreen";

const GameRoom = () => {
  const { roomId } = useParams();

  const {
    gameStarted,
    players,
    status,
    canStart,
    myHand,
    discardPile,
    wildCard,
    handleStartGame,
  } = useGameRoomSocket(roomId);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#064e3b] font-sans">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${GamePlay})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 flex scale-[0.6] items-center justify-center transition-transform duration-300 sm:scale-[0.8] md:scale-105 lg:scale-125">
        <div
          className="relative flex items-center justify-center"
          style={{ width: "650px", height: "350.47px" }}
        >
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
            style={{
              backgroundImage: `url(${table})`,
              backgroundSize: "100% 100%",
            }}
          />

          {!gameStarted ? (
            <WaitingScreen
              status={status}
              canStart={canStart}
              onStartGame={handleStartGame}
            />
          ) : (
            <div
              className="absolute z-30 flex flex-col items-center justify-between"
              style={{
                width: "400px",
                height: "174px",
                top: "115px",
              }}
            >
              <div className="flex w-full items-center justify-center gap-16">
                <div className="relative flex w-20 items-center">
                  <div className="absolute left-0 -rotate-12">
                    <Card card={wildCard} />
                  </div>

                  <div className="absolute left-4 flex h-[56px] w-[42px] items-center justify-center rounded-md border-2 border-white bg-[#5b89d8] shadow-lg">
                    <div className="flex h-[44px] w-[30px] items-center justify-center rounded-sm border border-white/40">
                      <span className="text-xl text-white opacity-40">♠</span>
                    </div>
                  </div>
                </div>

                <Card card={discardPile[discardPile.length - 1]} />
              </div>

              <div className="flex h-24 items-end gap-4 overflow-visible">
                <div className="flex flex-col items-center">
                  <div className="flex -space-x-7">
                    {myHand.map((card, index) => (
                      <Card key={card.id || `${card.imageKey}-${index}`} card={card} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {players.map((player, index) => {
            const isBottomPlayer = index === players.length - 1;
            if (isBottomPlayer) return null;

            return (
              <div
                key={player.userId}
                className={`absolute z-20 flex flex-col items-center ${getPositionClasses(index)}`}
                style={{ width: "74.36px", height: "87.09px" }}
              >
                <span className="mb-1 text-[9px] font-bold text-yellow-400">
                  Points: 10
                </span>

                <div className="relative h-[55px] w-[55px] overflow-hidden rounded-full border-[1.5px] border-cyan-400 bg-black/90 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.userName}`}
                    alt={player.userName}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="z-10 mt-[-4px] w-full rounded border border-white/10 bg-gradient-to-b from-gray-800 to-black px-1 py-0.5 text-center shadow-xl">
                  <span className="block truncate text-[10px] font-black uppercase tracking-tighter text-white">
                    {player.userName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 z-50 flex h-[55px] w-full max-w-[712px] items-center justify-between px-4">
        <div className="w-1/4" />

        <div className="relative flex h-full min-w-[200px] items-center">
          <div className="absolute inset-0 rounded-t-[25px] border-x border-t border-white/20 bg-black/80 backdrop-blur-md" />

          <div className="relative flex items-center justify-between gap-4 px-6">
            <div className="translate-x-10 -translate-y-7 overflow-hidden rounded-full border-2 border-white bg-gray-900 shadow-2xl">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                alt="Me"
                className="h-14 w-14 object-cover"
              />
            </div>

            <div className="absolute flex translate-x-30 -translate-y-2 flex-col gap-1">
              <span className="text-[9px] font-black uppercase text-gray-400">
                Points
              </span>

              <span className="text-xl font-black leading-none text-white">
                49
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-1/4 justify-end gap-2">
          <button className="rounded-full bg-yellow-500 px-4 py-1 text-[10px] font-bold shadow-lg">
            SORT
          </button>

          <button className="rounded-full bg-cyan-500 px-4 py-1 text-[10px] font-bold text-white shadow-lg">
            GROUP
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;