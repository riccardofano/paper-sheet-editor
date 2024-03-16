import { useState } from "react";
import type { TileType } from "../Tile";

import Text from "./Text";
import Split from "./Split";
import Select from "./Select";

export default function Tile() {
  const [tileType, setTileType] = useState<TileType | null>(null);

  if (!tileType) {
    return (
      <div className="tile">
        <Select setType={setTileType} />
      </div>
    );
  }

  return (
    <div className="tile" style={{ position: "relative" }}>
      <button
        style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 10 }}
        onClick={() => setTileType(null)}
      >
        X
      </button>
      {chooseType(tileType)}
    </div>
  );
}

function chooseType(tileType: TileType) {
  switch (tileType) {
    case "Text":
      return <Text />;
    case "Vertical Split":
      return <Split type="vertical" />;
    case "Horizontal Split":
      return <Split type="horizontal" />;
    default:
      throw new Error("Unknown tile type");
  }
}
