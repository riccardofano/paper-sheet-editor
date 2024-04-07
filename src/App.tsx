import { useEffect, useState } from "react";
import {
  SelectedTileContext,
  TileProperties,
  TilesContext,
  getDefaultProperties,
} from "./Tile";

import SettingsPanel from "./components/SettingsPanel";
import Tile from "./components/Tile";

import "./App.css";

function loadCanvas(): TileProperties[] {
  let canvas: TileProperties[];
  try {
    const saved = localStorage.getItem("canvasState");
    if (saved === null) {
      throw new Error("Could not find saved canvas");
    }
    const json = JSON.parse(saved);
    if (!Array.isArray(json) || typeof json[0] !== "object") {
      throw new Error("Saved canvas is not the correct type");
    }
    canvas = json;
  } catch (_) {
    canvas = [getDefaultProperties(null)];
  }
  return canvas;
}

function App() {
  const [selectedTile, setSelectedTile] = useState(0);
  const [tiles, setTiles] = useState<TileProperties[]>(loadCanvas());

  useEffect(() => {
    localStorage.setItem("canvasState", JSON.stringify(tiles));
  }, [tiles]);

  return (
    <SelectedTileContext.Provider
      value={{
        selectedTileId: selectedTile,
        setSelectedTileId: setSelectedTile,
      }}
    >
      <TilesContext.Provider value={{ tiles, setTiles }}>
        <main>
          <article className="canvas">
            <Tile id={0} />
          </article>
          <SettingsPanel />
        </main>
      </TilesContext.Provider>
    </SelectedTileContext.Provider>
  );
}

export default App;
