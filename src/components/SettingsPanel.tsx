import { FormEvent, useContext, useState } from "react";
import { toPng } from "html-to-image";

import { SelectedTileContext, TilesContext } from "../Tile";
import TextActions from "./TextActions";
import TileSettings from "./inputs/TileSettings";

export default function SettingsPanel() {
  const { tiles, setTiles } = useContext(TilesContext);
  const { selectedTileId } = useContext(SelectedTileContext);

  const [presets, setPresets] = useState(getAllPresets());

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
    <section className="settings">
      <h1>Canvas settings</h1>

      <section>
        <h2>Presets</h2>
        <form onSubmit={saveCurrentAsPreset}>
          <h3>Save as preset</h3>
          <input type="text" name="preset-name" />
          <button>Save preset</button>
        </form>

        <br />

        {Object.keys(presets).length > 0 && (
          <form onSubmit={loadPreset}>
            <h3>Load preset</h3>
            <select name="preset-name">
              {Object.keys(presets).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <button>Load preset</button>
          </form>
        )}
      </section>

      <section>
        <h2>Save canvas as an image</h2>
        <button className="btn-primary" onClick={saveToPng}>
          Save to png
        </button>
      </section>

      <section>
        <h2>Selected text settings</h2>
        <TextActions />
      </section>

      <section>
        <TileSettings tileId={selectedTileId} tile={selectedTile} />
      </section>
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

function saveToPng() {
  const canvas = document.querySelector(".canvas");

  if (!canvas) {
    console.error("Could not find the canvas node");
    return;
  }

  const firstTile = canvas.firstElementChild;
  if (!firstTile) {
    console.error("Could not find the first tile");
    return;
  }

  canvas.classList.add("saving");
  // HACK: wait for class to be applied
  setTimeout(() => {
    toPng(firstTile as HTMLElement)
      .then(function (dataUrl) {
        canvas.classList.remove("saving");
        const element = document.createElement("a");
        element.setAttribute("href", dataUrl);
        element.setAttribute("download", "canvas.png");

        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        element.remove();
      })
      .catch(function (error) {
        canvas.classList.remove("saving");
        console.error("oops, something went wrong!", error);
      });
  }, 100);
}
