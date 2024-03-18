import { Dispatch, SetStateAction, createContext } from "react";

export const tileTypes = [
  "Vertical Split",
  "Horizontal Split",
  "Text",
  "Image",
] as const;

export type TileType = (typeof tileTypes)[number];

export type NullTile = { type: null };
export type TextTile = { type: "Text"; text: string };
export type ImageTile = { type: "Image"; file: File | null };
export type SplitTile = {
  type: "Horizontal Split" | "Vertical Split";
  sizes: number[];
  amount: number;
  childIds: number[];
};

export type TileProperties = NullTile | SplitTile | TextTile | ImageTile;

export function getDefaultProperties(type: TileType | null): TileProperties {
  switch (type) {
    case null:
      return { type };
    case "Vertical Split":
    case "Horizontal Split":
      return { type, sizes: [100, 100], amount: 2, childIds: [] };
    case "Text":
      return { type, text: "Insert some text here" };
    case "Image":
      return { type, file: null };
  }
}

export type TileContextType = {
  tiles: TileProperties[];
  setTiles: Dispatch<SetStateAction<TileProperties[]>>;
};

export const TilesContext = createContext<TileContextType>({
  tiles: [],
  setTiles: () => {},
});

export const SelectedTileContext = createContext<
  Dispatch<SetStateAction<number>>
>(() => {});
