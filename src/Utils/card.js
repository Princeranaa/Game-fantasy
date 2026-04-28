import imageMap from "../Utils/cardImageMap";

export const getCardImage = (card) => {
  if (!card?.imageKey) return null;

  return imageMap[card.imageKey.toLowerCase()] || null;
};

export const getCardLabel = (card) => {
  if (!card) return "";
  return `${card.suit || ""} ${card.rank || ""}`;
};