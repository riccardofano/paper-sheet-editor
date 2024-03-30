import { useContext } from "react";
import { ListTile, TilesContext } from "../Tile";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface ParagraphListProps {
  id: number;
}

export default function ParagraphList({ id }: ParagraphListProps) {
  const { tiles, setTiles } = useContext(TilesContext);
  const tile = tiles[id];

  function addParagraph() {
    setTiles((prev) => {
      const next = [...prev];
      const tile = next[id] as ListTile;

      next[id] = {
        ...tile,
        paragraphs: [...tile.paragraphs, "New paragraph"],
      };

      return next;
    });
  }

  function handleChange(e: ContentEditableEvent, index: number) {
    setTiles((prev) => {
      const next = [...prev];
      const tile = next[id] as ListTile;

      const nextParagraphs = [...tile.paragraphs];
      nextParagraphs[index] = e.target.value;

      next[id] = { ...tile, paragraphs: nextParagraphs };
      return next;
    });
  }

  if (tile.type !== "List") {
    return;
  }

  return (
    <>
      <button className="add-paragraph" onClick={addParagraph}>
        +
      </button>
      <div className="paragraph-list" style={{ fontFamily: tile.font }}>
        {tile.paragraphs.map((text, i) => (
          // TODO: add way to remove paragraph
          <ContentEditable
            key={i}
            html={text}
            onChange={(e) => handleChange(e, i)}
          />
        ))}
      </div>
    </>
  );
}
