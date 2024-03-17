import Tile from "./components/Tile";

import "./App.css";
import { useState } from "react";
import { TileProperties, TilesContext, getDefaultProperties } from "./Tile";

function App() {
  const [tiles, setTiles] = useState<TileProperties[]>([
    getDefaultProperties(null),
  ]);

  return (
    <TilesContext.Provider value={{ tiles, setTiles }}>
      <main className="canvas">
        <Tile id={0} />
      </main>
    </TilesContext.Provider>
  );
}

export default App;
