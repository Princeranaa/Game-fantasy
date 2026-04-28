// Utils/cardImageMap.js

const cardImages = import.meta.glob(
  "../assets/Cards/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  },
);

const suitFolderMap = {
  club: "clubs",
  diamond: "diamonds",
  heart: "hearts",
  spades: "spades",
};

const imageMap = {};

Object.entries(cardImages).forEach(([path, image]) => {
  const parts = path.split("/");

  const rawFolder = parts[parts.length - 2];
  const rawFile = parts[parts.length - 1];

  const folder = suitFolderMap[rawFolder.toLowerCase()];
  const fileName = rawFile.split(".")[0].toLowerCase();

  if (fileName.includes("joker")) {
    imageMap["joker"] = image;
    return;
  }

  if (!folder) return;

  const key = `${folder}_${fileName}`;

  imageMap[key] = image;
});

export default imageMap;
