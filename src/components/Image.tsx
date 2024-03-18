import { ChangeEvent, useContext } from "react";
import { ImageTile, TilesContext } from "../Tile";

export default function Image({ id }: { id: number }) {
  const { tiles, setTiles } = useContext(TilesContext);
  const tile = tiles[id];

  function handleImagePicker(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setTiles((prev) => {
      const next = [...prev];
      next[id] = { ...next[id], file } as ImageTile;
      return next;
    });
  }

  if (tile.type !== "Image") {
    return;
  }

  const selectedImage = tile.file;
  if (!selectedImage) {
    return <ImagePicker handleChange={handleImagePicker} />;
  }

  return (
    <img
      className="uploaded-image"
      src={URL.createObjectURL(selectedImage)}
      alt=""
    />
  );
}

interface ImagePickerProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function ImagePicker({ handleChange }: ImagePickerProps) {
  return <input type="file" onChange={handleChange} />;
}
