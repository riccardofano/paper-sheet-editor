import { useContext } from "react";
import { DefaultTileProperties, ListTile, TilesContext } from "../Tile";

interface ParagraphListProps {
  id: number;
}

export default function ParagraphList({ id }: ParagraphListProps) {
  const { tiles, setTiles } = useContext(TilesContext);
  const tile = tiles[id];

  function addParagraph() {
    setTiles((prev) => {
      const next = [...prev];
      const tile = next[id] as ListTile & DefaultTileProperties;

      next[id] = {
        ...tile,
        paragraphs: [...tile.paragraphs, "New paragraph"],
      };

      return next;
    });
  }

  if (tile.type !== "List") {
    return;
  }

  return (
    <div className="paragraph-list">
      <button className="add-paragraph" onClick={addParagraph}>
        +
      </button>
      {tile.paragraphs.map((p, i) => (
        // TODO: change how content is edited
        // TODO: add way to remove paragraph
        <p key={i} contentEditable suppressContentEditableWarning>
          {p}
        </p>
      ))}
    </div>
  );
}
