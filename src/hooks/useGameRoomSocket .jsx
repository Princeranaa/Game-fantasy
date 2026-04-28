import { useEffect, useState } from "react";
import socket from "../Utils/socket";

export const useGameRoomSocket = (roomId) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [shouldAnimateDeal, setShouldAnimateDeal] = useState(false);
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("Joining room...");
  const [canStart, setCanStart] = useState(false);
  const [myHand, setMyHand] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [wildCard, setWildCard] = useState(null);

  useEffect(() => {
    if (!roomId) return;
    socket.emit("joinRoom", { roomId });

    socket.on("userJoined", (data) => {
      setPlayers(data.players || []);
      setStatus("Waiting for players...");
    });

    socket.on("waitingState", (data) => {
      setCanStart(data.canStart);
      setStatus(data.message || "Waiting for host...");
    });

    socket.on("gameStarting", (data) => {
      setStatus(data.message || "Game Starting...");
    });

    socket.on("gameStarted", (gameData) => {
      setGameStarted(true);
      setPlayers(gameData.players || []);
      setDiscardPile(gameData.discardPile || []);
      setWildCard(gameData.wildCard || null);
      setShouldAnimateDeal(!gameData.isRejoin);
    });

    socket.on("playerHand", (data) => {
      setMyHand(data.hand || []);
    });

    socket.on("turnError", (error) => {
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

  const startGame = () => {
    socket.emit("startGame", { roomId });
  };

  return {
    gameStarted,
    players,
    status,
    canStart,
    myHand,
    discardPile,
    wildCard,
    startGame,
    shouldAnimateDeal,
  };
};
