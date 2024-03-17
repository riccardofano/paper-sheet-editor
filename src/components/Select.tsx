import { ChangeEvent, useContext } from "react";
import { TileType, getDefaultProperties, tileTypes } from "../Tile";
import { TilesContext } from "../Tile";

interface TypeSelectionProps {
  id: number;
}

export default function TypeSelection({ id }: TypeSelectionProps) {
  const { setTiles } = useContext(TilesContext);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (!e.currentTarget.value) {
      return;
    }

    setTiles((prev) => {
      const next = [...prev];
      next[id] = getDefaultProperties(e.target.value as TileType);
      return next;
    });
  }

  return (
    <select name="tileType" onChange={handleChange} defaultValue="">
      <option disabled value="">
        -- Pick the tile type --
      </option>
      {tileTypes.map((tt) => (
        <option key={tt}>{tt}</option>
      ))}
    </select>
  );
}
