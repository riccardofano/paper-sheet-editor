import { Dispatch, SetStateAction, createContext } from "react";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & object;

export const tileTypes = [
  "Vertical Split",
  "Horizontal Split",
  "Text",
  "Image",
] as const;

export type TileType = (typeof tileTypes)[number];

export type DefaultTileProperties = { padding: string; margin: string };

export type NullTile = { type: null };
export type TextTile = { type: "Text"; text: string };
export type ImageTile = { type: "Image"; url: string };
export type SplitTile = {
  type: "Horizontal Split" | "Vertical Split";
  sizes: number[];
  amount: number;
  childIds: number[];
};

export type TileProperties = Prettify<
  (NullTile | SplitTile | TextTile | ImageTile) & DefaultTileProperties
>;

export function getDefaultProperties(type: TileType | null): TileProperties {
  const defaultTileProperties = { padding: "0", margin: "0" };
  switch (type) {
    case null:
      return { ...defaultTileProperties, type };
    case "Vertical Split":
    case "Horizontal Split":
      return {
        ...defaultTileProperties,
        type,
        sizes: [100, 100],
        amount: 2,
        childIds: [],
      };
    case "Text":
      return { ...defaultTileProperties, type, text: "Insert some text here" };
    case "Image":
      return { ...defaultTileProperties, type, url: "" };
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

export type SelectedTileContextType = {
  selectedTileId: number;
  setSelectedTileId: Dispatch<SetStateAction<number>>;
};

export const SelectedTileContext = createContext<SelectedTileContextType>({
  selectedTileId: 0,
  setSelectedTileId: () => {},
});
