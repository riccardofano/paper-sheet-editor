import { useContext } from "react";
import { TilesContext } from "../Tile";

interface SettingsPanelProps {
  selectedId: number;
}

export default function SettingsPanel({ selectedId }: SettingsPanelProps) {
  const { tiles, setTiles } = useContext(TilesContext);

  const selectedTile = tiles[selectedId];
  if (!selectedTile) {
    console.error("Selected tile does not exist");
    return;
  }

  return (
    <section style={{ padding: "1rem" }}>
      {Object.entries(selectedTile).map(([key, value]) => (
        <label key={key} style={{ display: "block" }}>
          {key}
          <input type="text" value={value} />
        </label>
      ))}
    </section>
  );
}
