export const tileTypes = [
  "Vertical Split",
  "Horizontal Split",
  "Text",
  "Image",
] as const;

export type TileType = (typeof tileTypes)[number];
