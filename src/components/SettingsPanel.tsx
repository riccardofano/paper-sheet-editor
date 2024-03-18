import { ChangeEvent, useContext } from "react";
import { TilesContext } from "../Tile";

interface SettingsPanelProps {
  selectedId: number;
}

export default function SettingsPanel({ selectedId }: SettingsPanelProps) {
  const { tiles, setTiles } = useContext(TilesContext);

  function handleChange(e: ChangeEvent<HTMLInputElement>, key: string) {
    // TODO: some properties have to be changed differently like the type
    // and basically everything that is not a string

    setTiles((prev) => {
      const next = [...prev];
      // @ts-expect-error: The keys provided to the function come from the
      // object itself already so it shouldn't be a problem to index by them
      next[selectedId][key] = e.target.value;
      return next;
    });
  }

  const selectedTile = tiles[selectedId];
  if (!selectedTile) {
    console.error("Selected tile does not exist");
    return;
  }

  return (
    <section style={{ padding: "1rem" }}>
      {selectedTile.type !== null &&
        Object.entries(selectedTile).map(([key, value]) => (
          <label key={key} style={{ display: "block" }}>
            {key}
            <br />
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(e, key)}
            />
          </label>
        ))}
    </section>
  );
}
