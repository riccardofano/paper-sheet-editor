import { ChangeEvent, useContext } from "react";
import { DefaultTileProperties, ImageTile, TilesContext } from "../Tile";

export default function Image({ id }: { id: number }) {
  const { tiles, setTiles } = useContext(TilesContext);
  const tile = tiles[id];

  function handleImagePicker(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    setTiles((prev) => {
      const next = [...prev];
      next[id] = { ...next[id], url } as ImageTile & DefaultTileProperties;
      return next;
    });
  }

  if (tile.type !== "Image") {
    return;
  }

  const selectedImage = tile.url;
  if (!selectedImage) {
    return <ImagePicker handleChange={handleImagePicker} />;
  }

  return <img className="uploaded-image" src={selectedImage} alt="" />;
}

interface ImagePickerProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function ImagePicker({ handleChange }: ImagePickerProps) {
  return <input type="file" onChange={handleChange} />;
}
