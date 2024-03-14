import { Dispatch, SetStateAction } from "react";
import Tile, { TileType } from "./Tile";

export function chooseType(
  tileType: TileType | null,
  setTileType: Dispatch<SetStateAction<TileType | null>>
) {
  switch (tileType) {
    case "Text":
      return <Text />;
    case "Vertical Split":
      return (
        <Split type="vertical">
          <Tile />
          <Tile />
        </Split>
      );
    case "Horizontal Split":
      return (
        <Split type="horizontal">
          <Tile />
          <Tile />
        </Split>
      );
    default:
      return <TypeSelection setType={setTileType} />;
  }
}
