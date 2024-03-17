import { useContext } from "react";
import { ImageTile, TilesContext } from "../Tile";

export default function Image({ id }: { id: number }) {
  const { tiles, setTiles } = useContext(TilesContext);
  const tile = tiles[id];

  if (tile.type !== "Image") {
    return;
  }

  const selectedImage = tile.file;
  if (!selectedImage) {
    return (
      <input
        type="file"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;

          setTiles((prev) => {
            const next = [...prev];
            next[id] = { ...next[id], file } as ImageTile;
            return next;
          });
        }}
      />
    );
  }

  return (
    <img
      className="uploaded-image"
      src={URL.createObjectURL(selectedImage)}
      alt=""
    />
  );
}
