import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import table from "../assets/GameSection/game-table.png";
import GamePlay from "../assets/Loading/Game-Play.png";
import socket from "../Utils/socket";

const cardImages = import.meta.glob(
  "../assets/cards/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  },
);

const GameRoom = () => {
  const { roomId } = useParams();

  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("Joining room...");
  const [canStart, setCanStart] = useState(false);

  const [myHand, setMyHand] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [wildCard, setWildCard] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    // JOIN SOCKET ROOM
    socket.emit("joinRoom", { roomId });

    // PLAYER JOINED
    socket.on("userJoined", (data) => {
      setPlayers(data.players || []);
      setStatus("Waiting for players...");
    });

    // WAITING STATE
    socket.on("waitingState", (data) => {
      setCanStart(data.canStart);
      setStatus(data.message || "Waiting for host...");
    });

    // AUTO / MANUAL STARTING
    socket.on("gameStarting", (data) => {
      setStatus(data.message || "Game Starting...");
    });

    // GAME STARTED
    socket.on("gameStarted", (gameData) => {
      console.log("gameData", gameData);

      setGameStarted(true);
      setPlayers(gameData.players || []);
      setDiscardPile(gameData.discardPile || []);
      setWildCard(gameData.wildCard || null);
    });

    socket.on("playerHand", (data) => {
      setMyHand(data.hand || []);
    });

    // ERRORS
    socket.on("turnError", (error) => {
      console.log(error);
      alert(error.message);
    });

    return () => {
      socket.off("userJoined");
      socket.off("waitingState");
      socket.off("gameStarting");
      socket.off("playerHand");
      socket.off("gameStarted");
      socket.off("turnError");
    };
  }, [roomId]);

  // HOST START GAME
  const handleStartGame = () => {
    socket.emit("startGame", { roomId });
  };

  // DYNAMIC PLAYER POSITION
  const getPositionClasses = (index) => {
    switch (index) {
      case 0:
        return "top-[12%] left-[25%] -translate-x-1/2 -translate-y-1/2";

      case 1:
        return "top-[12%] left-1/2 -translate-x-1/2 -translate-y-1/2";

      case 2:
        return "top-[12%] left-[75%] -translate-x-1/2 -translate-y-1/2";

      case 3:
        return "top-[50%] left-[3%] -translate-x-1/2 -translate-y-1/2";

      case 4:
        return "top-[50%] right-[3%] translate-x-1/2 -translate-y-1/2";

      default:
        return "";
    }
  };

  const getCardImage = (card) => {
    if (!card) return null;

    const suitMap = {
      "♠️": ["spades", "spade"],
      "♠": ["spades", "spade"],
      "♥️": ["heart", "hearts"],
      "♥": ["heart", "hearts"],
      "♦️": ["diamond", "diamonds"],
      "♦": ["diamond", "diamonds"],
      "♣️": ["club", "clubs"],
      "♣": ["club", "clubs"],
    };

    const suitSymbol = Object.keys(suitMap).find((symbol) =>
      card.startsWith(symbol),
    );

    if (!suitSymbol) return null;

    const rank = card.replace(suitSymbol, "").replace("️", "").toLowerCase();
    const folders = suitMap[suitSymbol];

    const imagePath = Object.entries(cardImages).find(([path]) => {
      const normalizedPath = path.toLowerCase();

      return (
        folders.some((folder) => normalizedPath.includes(`/${folder}/`)) &&
        normalizedPath.endsWith(`/${rank}.png`)
      );
    });

    return imagePath?.[1] || null;
  };

  // MODERN CARD UI
  const Card = ({ card }) => {
    const image = getCardImage(card);

    if (!image) {
      return (
        <div className="flex h-[72px] w-[50px] items-center justify-center rounded-md bg-white text-xs font-bold text-black">
          {card}
        </div>
      );
    }

    return (
      <img
        src={image}
        alt={card}
        className="h-[72px] w-[50px] select-none rounded-md object-contain drop-shadow-lg"
        draggable={false}
      />
    );
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#064e3b] font-sans">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${GamePlay})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* SCALE WRAPPER */}
      <div className="relative z-10 flex scale-[0.6] items-center justify-center transition-transform duration-300 sm:scale-[0.8] md:scale-105 lg:scale-125">
        <div
          className="relative flex items-center justify-center"
          style={{
            width: "650px",
            height: "350.47px",
          }}
        >
          {/* TABLE */}
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
            style={{
              backgroundImage: `url(${table})`,
              backgroundSize: "100% 100%",
            }}
          />

          {/* WAITING SCREEN */}
          {!gameStarted ? (
            <div className="relative flex flex-col items-center">
              <h1 className="select-none text-4xl font-black text-white">
                Waiting.....
              </h1>

              <p className="mt-3 text-sm font-bold uppercase tracking-widest text-white/60">
                {status}
              </p>

              {/* HOST START BUTTON */}
              {canStart && (
                <button
                  onClick={handleStartGame}
                  className="mt-5 rounded-full bg-yellow-500 px-8 py-3 text-sm font-black uppercase text-black shadow-xl"
                >
                  Start Game
                </button>
              )}
            </div>
          ) : (
            /* GAME STARTED */
            <div
              className="absolute z-30 flex flex-col items-center justify-between"
              style={{
                width: "400px",
                height: "174px",
                top: "115px",
              }}
            >
               
              {/* TOP CENTER */}
              <div className="flex w-full items-center justify-center gap-16">
                {/* DRAW PILE */}
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

                {/* DISCARD */}
                <div className="relative">
                  <Card card={discardPile[discardPile.length - 1]} />
                </div>
              </div>

              {/* PLAYER CARDS - SAME POSITION, SAME HEIGHT */}
              <div className="flex h-24 items-end gap-4 overflow-visible">
                <div className="flex flex-col items-center">
                  <div className="flex -space-x-7">
                    {myHand.map((card, index) => (
                      <Card key={`${card}-${index}`} card={card} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OTHER PLAYERS */}
          {players.map((player, index) => {
            const isBottomPlayer = index === players.length - 1;

            if (isBottomPlayer) return null;

            return (
              <div
                key={player.userId}
                className={`absolute z-20 flex flex-col items-center ${getPositionClasses(
                  index,
                )}`}
                style={{
                  width: "74.36px",
                  height: "87.09px",
                }}
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

      {/* BOTTOM CURRENT USER */}
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

        {/* ACTION BUTTONS */}
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
