export const tileTypes = [
  "Vertical Split",
  "Horizontal Split",
  "Text",
] as const;

export type TileType = (typeof tileTypes)[number];
