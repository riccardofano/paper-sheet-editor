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
    <div className="tile">
      <button className="dismiss" onClick={() => setTileType(null)}>
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
    default: {
      const exhaustiveCheck: never = tileType;
      throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
    }
  }
}
