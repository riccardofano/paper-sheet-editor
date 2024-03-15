import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TileType, tileTypes } from "../Tile";

interface TypeSelectionProps {
  setType: Dispatch<SetStateAction<TileType | null>>;
}

export default function TypeSelection({ setType }: TypeSelectionProps) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (!e.currentTarget.value) {
      return;
    }

    setType(e.currentTarget.value as TileType);
  }

  return (
    <select name="tileType" onChange={handleChange} defaultValue="">
      <option disabled selected value="">
        -- Pick the tile type --
      </option>
      {tileTypes.map((tt) => (
        <option value={tt}>{tt}</option>
      ))}
    </select>
  );
}
