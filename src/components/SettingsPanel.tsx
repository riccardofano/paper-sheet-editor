import { FormEvent, useContext, useState } from "react";
import { SelectedTileContext, TilesContext } from "../Tile";
import TextActions from "./TextActions";

export default function SettingsPanel() {
  const { tiles, setTiles } = useContext(TilesContext);
  const { selectedTileId } = useContext(SelectedTileContext);

  const [presets, setPresets] = useState(getAllPresets());

  function handleChange(tileId: number, key: string, value: number | string) {
    // TODO: some properties have to be changed differently like the type
    // and basically everything that is not a string

    setTiles((prev) => {
      const next = [...prev];
      // @ts-expect-error: The keys provided to the function come from the
      // object itself already so it shouldn't be a problem to index by them
      next[tileId][key] = value;
      return next;
    });
  }

  function changeArrayIndex(
    tileId: number,
    key: string,
    value: number | string,
    index: number
  ) {
    setTiles((prev) => {
      const next = [...prev];
      const tile = next[tileId];
      // @ts-expect-error: I know it's an array.
      const nextArray = [...tile[key]];
      nextArray[index] = value;

      next[tileId] = {
        ...tile,
        [key]: nextArray,
      };

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

  const selectedTile = tiles[selectedTileId];
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

      <h1>Selected text settings</h1>
      <TextActions />

      <h1>Selected tile settings</h1>
      {selectedTile.type !== null &&
        Object.entries(selectedTile).map(([key, value]) => {
          return Array.isArray(value) ? (
            <ArrayInput
              key={key}
              k={key}
              value={value}
              handleChange={(value, index) =>
                changeArrayIndex(selectedTileId, key, value, index)
              }
            />
          ) : (
            <PrimitiveInput
              key={key}
              k={key}
              value={value}
              handleChange={(value) => handleChange(selectedTileId, key, value)}
            />
          );
        })}
    </section>
  );
}

interface PrimitiveInputProps {
  k: string;
  value: string | number;
  handleChange: (value: string | number) => void;
}

function PrimitiveInput({ k, value, handleChange }: PrimitiveInputProps) {
  return (
    <label key={k} style={{ display: "block" }}>
      {k}
      <br />

      {typeof value === "string" ? (
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
      ) : (
        <input
          type="range"
          value={value}
          min={2}
          max={8}
          onChange={(e) => handleChange(+e.target.value)}
        />
      )}
    </label>
  );
}

interface ArrayInputProps {
  k: string;
  value: unknown[];
  handleChange: (value: string | number, index: number) => void;
}

function ArrayInput({ k, value, handleChange }: ArrayInputProps) {
  return (
    <>
      {value.map((val, index) => {
        if (typeof val !== "string" && typeof val !== "number") {
          return;
        }

        return (
          <PrimitiveInput
            key={`${k}-${index}`}
            k={`${k}-${index}`}
            value={val}
            handleChange={(value) => handleChange(value, index)}
          />
        );
      })}
    </>
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
