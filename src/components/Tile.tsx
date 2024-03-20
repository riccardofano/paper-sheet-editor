import { useContext } from "react";
import {
  getDefaultProperties,
  SelectedTileContext,
  TilesContext,
  type TileType,
} from "../Tile";

import Text from "./Text";
import Split from "./Split";
import Select from "./Select";
import Image from "./Image";
import ParagraphList from "./ParagraphList";

interface TileProps {
  id: number;
}

export default function Tile({ id }: TileProps) {
  const { tiles, setTiles } = useContext(TilesContext);
  const { selectedTileId, setSelectedTileId } = useContext(SelectedTileContext);

  const tileType = tiles[id]?.type ?? null;

  function resetTile() {
    setTiles((prev) => {
      const next = [...prev];
      next[id] = getDefaultProperties(null);
      return next;
    });
  }

  function setAsSelected(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setSelectedTileId(id);
  }

  if (!tileType) {
    return (
      <div className="tile">
        <Select id={id} />
      </div>
    );
  }

  return (
    <div
      className={"tile" + (id === selectedTileId ? " selected" : "")}
      style={{ padding: tiles[id].padding, margin: tiles[id].margin }}
      onClick={setAsSelected}
    >
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
    case "List":
      return <ParagraphList id={id} />;
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
