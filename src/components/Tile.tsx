import { Dispatch, SetStateAction, useState } from "react";
import type { TileType } from "../Tile";

import Text from "./Text";
import Split from "./Split";
import Select from "./Select";

export default function Tile() {
  const [tileType, setTileType] = useState<TileType | null>(null);

  return <div className="tile">{chooseType(tileType, setTileType)}</div>;
}

function chooseType(
  tileType: TileType | null,
  setTileType: Dispatch<SetStateAction<TileType | null>>
) {
  switch (tileType) {
    case "Text":
      return <Text />;
    case "Vertical Split":
      return <Split type="vertical" />;
    case "Horizontal Split":
      return <Split type="horizontal" />;
    default:
      return <Select setType={setTileType} />;
  }
}
