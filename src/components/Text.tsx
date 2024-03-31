import { useContext } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { TextTile, TilesContext } from "../Tile";

interface TextProps {
  id: number;
  tile: TextTile;
}

export default function Text({ id, tile }: TextProps) {
  const { setTiles } = useContext(TilesContext);

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
      style={{ fontFamily: `"${tile.font}"` }}
    />
  );

  if (tile.quoted) {
    return <blockquote>{content}</blockquote>;
  }

  return content;
}
