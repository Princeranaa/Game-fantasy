import React from "react";
import { getCardImage, getCardLabel } from "../Utils/card";

const Card = ({ card }) => {
  const image = getCardImage(card);
  const cardLabel = getCardLabel(card);

  if (!image) {
    return (
      <div className="flex h-[72px] w-[50px] items-center justify-center rounded-md bg-white text-xs font-bold text-black">
        {cardLabel}
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={cardLabel}
      className="h-[72px] w-[50px] select-none rounded-md object-contain drop-shadow-lg"
      draggable={false}
    />
  );
};

export default Card;
