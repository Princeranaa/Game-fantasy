import imageMap from "../Utils/cardImageMap";

export const getCardImage = (card) => {
  if (!card?.imageKey) return null;

  const key = card.imageKey.toLowerCase();

  // console.log("Looking for:", key);
  // console.log("Available keys:", Object.keys(imageMap));
  // console.log("Found:", imageMap[key]);

  return imageMap[key] || null;
};

export const getCardLabel = (card) => {
  if (!card) return "";
  return `${card.suit || ""} ${card.rank || ""}`;
};