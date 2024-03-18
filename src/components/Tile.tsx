import { useContext } from "react";
import { SelectedTileContext, TilesContext, type TileType } from "../Tile";

import Text from "./Text";
import Split from "./Split";
import Select from "./Select";
import Image from "./Image";

interface TileProps {
  id: number;
}

export default function Tile({ id }: TileProps) {
  const { tiles, setTiles } = useContext(TilesContext);
  const setSelectedTile = useContext(SelectedTileContext);

  const tileType = tiles[id]?.type ?? null;

  function resetTile() {
    setTiles((prev) => {
      const next = [...prev];
      next[id] = { type: null };
      return next;
    });
  }

  function setAsSelected(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setSelectedTile(id);
  }

  if (!tileType) {
    return (
      <div className="tile">
        <Select id={id} />
      </div>
    );
  }

  return (
    <div className="tile" onClick={setAsSelected}>
      <button className="dismiss" onClick={resetTile}>
        X
      </button>
      {chooseType(id, tileType)}
    </div>
  );
}

function chooseType(id: number, tileType: TileType) {
  switch (tileType) {
    case "Text":
      return <Text id={id} />;
    case "Vertical Split":
      return <Split id={id} orientation="vertical" />;
    case "Horizontal Split":
      return <Split id={id} orientation="horizontal" />;
    case "Image":
      return <Image id={id} />;
    default: {
      const exhaustiveCheck: never = tileType;
      throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
    }
  }
}
