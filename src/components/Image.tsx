import { ChangeEvent, useContext } from "react";
import { ImageTile, TilesContext } from "../Tile";

interface ImageProps {
  id: number;
  tile: ImageTile;
}

export default function Image({ id, tile }: ImageProps) {
  const { setTiles } = useContext(TilesContext);

  function handleImagePicker(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    setTiles((prev) => {
      const next = [...prev];
      next[id] = { ...next[id], url } as ImageTile;
      return next;
    });
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
