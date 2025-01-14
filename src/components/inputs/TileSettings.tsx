import { useContext } from "react";
import { TileProperties, TilesContext } from "../../Tile";

import { chooseInputType } from "./chooseInput";

interface TileSettingsProps {
  tileId: number;
  tile: TileProperties;
}

export default function TileSettings({ tileId, tile }: TileSettingsProps) {
  const { setTiles } = useContext(TilesContext);

  function handleChange(key: string, change: unknown) {
    setTiles((prev) => {
      const next = [...prev];
      // @ts-expect-error: The keys provided to the function come from the
      // object itself already so it shouldn't be a problem to index by them
      next[tileId][key] = change;
      return next;
    });
  }

  return (
    <div className="fields tile-settings">
      <h1>Selected tile settings</h1>
      {tile.type !== null &&
        Object.entries(tile).map(([key, value]) =>
          chooseInputType(tileId, key, value, (change) =>
            handleChange(key, change),
          ),
        )}
    </div>
  );
}
