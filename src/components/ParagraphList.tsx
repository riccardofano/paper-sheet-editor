import { useContext } from "react";
import { ListTile, TilesContext } from "../Tile";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface ParagraphListProps {
  id: number;
  tile: ListTile;
}

export default function ParagraphList({ id, tile }: ParagraphListProps) {
  const { setTiles } = useContext(TilesContext);

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

  return (
    <>
      <button className="add-paragraph" onClick={addParagraph}>
        ＋
      </button>
      <div className="paragraph-list" style={{ fontFamily: `"${tile.font}"` }}>
        {tile.paragraphs.map((text, i) => (
          // TODO: add way to remove paragraph
          <ContentEditable
            key={i}
            html={text}
            className="content-editable"
            onChange={(e) => handleChange(e, i)}
          />
        ))}
      </div>
    </>
  );
}
