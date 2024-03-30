import { useContext } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { TextTile, TilesContext } from "../Tile";

export default function Text({ id }: { id: number }) {
  const { tiles, setTiles } = useContext(TilesContext);
  const tile = tiles[id];

  if (tile.type !== "Text") {
    return;
  }

  function handleChange(e: ContentEditableEvent) {
    setTiles((prev) => {
      const next = [...prev];
      next[id] = { ...next[id], text: e.target.value } as TextTile;
      return next;
    });
  }

  const content = (
    <ContentEditable
      html={tile.text}
      onChange={handleChange}
      className="content-editable"
      tagName="p"
    />
  );

  if (tile.quoted) {
    return <blockquote>{content}</blockquote>;
  }

  return content;
}
