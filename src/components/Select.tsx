import { Dispatch, FormEvent, SetStateAction } from "react";
import { TileType, tileTypes } from "../Tile";

interface TypeSelectionProps {
  setType: Dispatch<SetStateAction<TileType | null>>;
}

export default function TypeSelection({ setType }: TypeSelectionProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const type = formData.get("tileType");
    if (!type) {
      return;
    }

    setType(type as TileType);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pick the tile type:
        <select name="tileType" defaultValue={tileTypes[0]}>
          {tileTypes.map((tt) => (
            <option value={tt}>{tt}</option>
          ))}
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
