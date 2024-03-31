import { useContext } from "react";
import {
  getDefaultProperties,
  SelectedTileContext,
  TileProperties,
  TilesContext,
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

  const tile = tiles[id];

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

  if (!tile.type) {
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
      {chooseType(id, tiles[id])}
    </div>
  );
}

function chooseType(id: number, tile: TileProperties) {
  switch (tile.type) {
    case "Text":
      return <Text id={id} tile={tile} />;
    case "List":
      return <ParagraphList id={id} tile={tile} />;
    case "Vertical Split":
      return <Split id={id} tile={tile} orientation="vertical" />;
    case "Horizontal Split":
      return <Split id={id} tile={tile} orientation="horizontal" />;
    case "Image":
      return <Image id={id} tile={tile} />;
    case null:
      throw new Error("Unreachable");
    default: {
      const exhaustiveCheck: never = tile;
      throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
    }
  }
}
