import { useState } from "react";
import {
  SelectedTileContext,
  TileProperties,
  TilesContext,
  getDefaultProperties,
} from "./Tile";

import SettingsPanel from "./components/SettingsPanel";
import Tile from "./components/Tile";

import "./App.css";

function App() {
  const [selectedTile, setSelectedTile] = useState(0);
  const [tiles, setTiles] = useState<TileProperties[]>([
    getDefaultProperties(null),
  ]);

  return (
    <SelectedTileContext.Provider
      value={{
        selectedTileId: selectedTile,
        setSelectedTileId: setSelectedTile,
      }}
    >
      <TilesContext.Provider value={{ tiles, setTiles }}>
        <main style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <SettingsPanel />

          <article className="canvas">
            <Tile id={0} />
          </article>
        </main>
      </TilesContext.Provider>
    </SelectedTileContext.Provider>
  );
}

export default App;
