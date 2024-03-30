import { ChangeEvent, useContext } from "react";
import { TilesContext } from "../../Tile";

interface BooleanInputProps {
  tileId: number;
  label: string;
  value: boolean;
}

export default function BooleanInput({
  tileId,
  label,
  value,
}: BooleanInputProps) {
  const { setTiles } = useContext(TilesContext);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTiles((prev) => {
      const next = [...prev];
      // @ts-expect-error: The keys provided to the function come from the
      // object itself already so it shouldn't be a problem to index by them
      next[tileId][label] = e.target.checked;
      return next;
    });
  }

  return (
    <label>
      {label}
      <br />
      <input type="text" checked={value} onChange={handleChange} />
    </label>
  );
}
