export const PLAYER_POSITIONS = [
  "top-[12%] left-[25%] -translate-x-1/2 -translate-y-1/2",
  "top-[12%] left-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-[12%] left-[75%] -translate-x-1/2 -translate-y-1/2",
  "top-[50%] left-[3%] -translate-x-1/2 -translate-y-1/2",
  "top-[50%] right-[3%] translate-x-1/2 -translate-y-1/2",
];

export const getPositionClasses = (index) => {
  return PLAYER_POSITIONS[index] || "";
};