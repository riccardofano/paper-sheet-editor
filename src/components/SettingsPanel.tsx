import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { TilesContext } from "../Tile";

interface SettingsPanelProps {
  selectedId: number;
}

export default function SettingsPanel({ selectedId }: SettingsPanelProps) {
  const { tiles, setTiles } = useContext(TilesContext);
  const [presets, setPresets] = useState(getAllPresets());

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

  function saveCurrentAsPreset(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    const name = String(data.get("preset-name"));
    if (!name) {
      console.error("User didn't provide name for preset");
      return;
    }

    const nextPresets = { ...presets };
    nextPresets[name] = tiles;
    savePresets(nextPresets);
    setPresets(nextPresets);
  }

  // TODO: Images from presets don't get loaded correctly
  function loadPreset(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    const name = String(data.get("preset-name"));
    if (!name) {
      console.error("No name for the preset to load");
      return;
    }

    const presetToLoad = presets[name];
    if (!presetToLoad) {
      console.error("Could not find desired preset");
      return;
    }
    if (!Array.isArray(presetToLoad)) {
      console.error("Saved preset was not an array");
      return;
    }

    setTiles(presetToLoad);
  }

  const selectedTile = tiles[selectedId];
  if (!selectedTile) {
    console.error("Selected tile does not exist");
    return;
  }

  return (
    <section style={{ padding: "1rem" }}>
      <h1>Presets</h1>
      <form onSubmit={saveCurrentAsPreset}>
        <h2>Save as preset</h2>
        <input type="text" name="preset-name" />
        <button>Save preset</button>
      </form>

      <form onSubmit={loadPreset}>
        <h2>Load preset</h2>
        <select name="preset-name">
          {Object.keys(presets).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <button>Load preset</button>
      </form>

      <h1>Selected tile settings</h1>
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

function getAllPresets(): Record<string, unknown> {
  const presetsAsString = localStorage.getItem("presets");
  if (!presetsAsString) {
    return {};
  }

  try {
    const allPresets = JSON.parse(presetsAsString);
    if (typeof allPresets !== "object") {
      return {};
    }

    return allPresets;
  } catch (e) {
    console.error(e);
    return {};
  }
}

function savePresets(presets: Record<string, unknown>) {
  localStorage.setItem("presets", JSON.stringify(presets));
}
