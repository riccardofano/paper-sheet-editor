import { useState } from "react";

export default function Image() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  if (!selectedImage) {
    return (
      <input
        type="file"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          setSelectedImage(file);
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
