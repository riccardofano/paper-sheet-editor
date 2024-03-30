import { useContext } from "react";
import { TilesContext } from "../../Tile";
import { chooseInputType } from "./chooseInput";

interface StringInputProps<T> {
  tileId: number;
  label: string;
  values: T[];
}

export default function ArrayInput<T>({
  tileId,
  label,
  values,
}: StringInputProps<T>) {
  const { setTiles } = useContext(TilesContext);

  function changeArrayIndex<T>(
    tileId: number,
    key: string,
    change: T,
    index: number
  ) {
    setTiles((prev) => {
      const next = [...prev];
      const tile = next[tileId];

      // @ts-expect-error: I know it's an array.
      const nextArray = [...tile[key]];
      nextArray[index] = change;

      next[tileId] = {
        ...tile,
        [key]: nextArray,
      };

      return next;
    });
  }

  return (
    <section>
      {label}
      {values.map((value, index) =>
        chooseInputType(tileId, String(index), value, (change) =>
          changeArrayIndex(tileId, label, change, index)
        )
      )}
    </section>
  );
}
