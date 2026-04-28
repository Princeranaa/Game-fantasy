import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCardImage, getCardLabel } from "../Utils/card";

const Card = ({ card, index = 0, animateDeal = false }) => {
  const [revealed, setRevealed] = useState(!animateDeal);

  const image = getCardImage(card);
  const cardLabel = getCardLabel(card);

  useEffect(() => {
    if (!animateDeal) return;

    setRevealed(false);

    const timer = setTimeout(() => {
      setRevealed(true);
    }, 3500 + index * 120);

    return () => clearTimeout(timer);
  }, [animateDeal, index]);

  const dealAnimation = animateDeal
    ? {
        initial: {
          opacity: 0,
          x: -95,
          y: -105,
          rotate: -12,
          scale: 0.75,
        },
        animate: {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
        },
        transition: {
          duration: 0.42,
          delay: index * 0.1,
          ease: [0.25, 0.8, 0.25, 1],
        },
      }
    : {};

  return (
    <motion.div
      {...dealAnimation}
      className="relative h-[72px] w-[50px] select-none"
      style={{ perspective: "800px" }}
    >
      <motion.div
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{
          duration: 0.45,
          ease: "easeInOut",
        }}
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Back Side */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-md border-2 border-white bg-[#5b89d8] shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex h-[58px] w-[38px] items-center justify-center rounded-sm border border-white/40">
            <span className="text-xl text-white opacity-40">♠</span>
          </div>
        </div>

        {/* Front Side */}
        <div
          className="absolute inset-0 rounded-md"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {image ? (
            <img
              src={image}
              alt={cardLabel}
              className="h-[72px] w-[50px] rounded-md object-contain drop-shadow-lg"
              draggable={false}
            />
          ) : (
            <div className="flex h-[72px] w-[50px] items-center justify-center rounded-md bg-white text-xs font-bold text-black">
              {cardLabel}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;