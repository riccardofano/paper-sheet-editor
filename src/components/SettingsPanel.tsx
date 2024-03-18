import { ChangeEvent, FormEvent, useContext } from "react";
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

  function saveCurrentAsPreset(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    const name = String(data.get("preset-name"));
    if (!name) {
      console.error("User didn't provide name for preset");
      return;
    }

    try {
      const presets = getAllPresets();
      presets[name] = tiles;
      savePresets(presets);
    } catch (e) {
      console.error(e);
      return;
    }
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

    try {
      const presets = getAllPresets();
      const presetToLoad = presets[name];

      if (!presetToLoad) {
        throw new Error("Could not find desired preset");
      }
      if (!Array.isArray(presetToLoad)) {
        throw new Error("Saved preset was not an array");
      }

      setTiles(presetToLoad);
    } catch (e) {
      console.error(e);
      return;
    }
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
        <input type="text" name="preset-name" />
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

  const allPresets = JSON.parse(presetsAsString);

  if (typeof allPresets !== "object") {
    return {};
  }

  return allPresets;
}

function savePresets(presets: Record<string, unknown>) {
  localStorage.setItem("presets", JSON.stringify(presets));
}
