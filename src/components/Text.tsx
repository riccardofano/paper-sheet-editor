import { useContext } from "react";
import { TilesContext } from "../Tile";

// TODO: Text should be controlled
export default function Text({ id }: { id: number }) {
  const { tiles } = useContext(TilesContext);
  const tile = tiles[id];

  if (tile.type !== "Text") {
    return;
  }

  return (
    <span
      contentEditable
      suppressContentEditableWarning
      style={{ minWidth: "1rem", border: "1px dashed gray" }}
    >
      Insert your text here -- {tile.text} --
    </span>
  );
}
