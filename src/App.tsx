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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <SettingsPanel />

          <main id="canvas">
            <Tile id={0} />
          </main>
        </div>
      </TilesContext.Provider>
    </SelectedTileContext.Provider>
  );
}

export default App;
