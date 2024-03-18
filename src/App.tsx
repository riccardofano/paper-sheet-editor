import { useState } from "react";
import { TileProperties, TilesContext, getDefaultProperties } from "./Tile";

import SettingsPanel from "./components/SettingsPanel";
import Tile from "./components/Tile";

import "./App.css";

function App() {
  const [tiles, setTiles] = useState<TileProperties[]>([
    getDefaultProperties(null),
  ]);

  return (
    <TilesContext.Provider value={{ tiles, setTiles }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <SettingsPanel selectedId={0} />

        <main className="canvas">
          <Tile id={0} />
        </main>
      </div>
    </TilesContext.Provider>
  );
}

export default App;
