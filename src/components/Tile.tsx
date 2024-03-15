import { Dispatch, SetStateAction, useState } from "react";
import type { TileType } from "../Tile";

import Text from "./Text";
import Split from "./Split";
import Select from "./Select";

const layoutCSS = {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Tile() {
  const [tileType, setTileType] = useState<TileType | null>(null);

  return (
    <div style={{ ...layoutCSS }}>{chooseType(tileType, setTileType)}</div>
  );
}

function chooseType(
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
      return <Select setType={setTileType} />;
  }
}
