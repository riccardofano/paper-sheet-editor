import { ChangeEvent, FormEvent, useContext } from "react";
import SplitPane from "split-pane-react";

import "../components/Split.css";
import Tile from "./Tile";
import { SplitTile, TilesContext, getDefaultProperties } from "../Tile";

interface SplitProps {
  id: number;
  orientation: "vertical" | "horizontal";
}

export default function Split({ id, orientation }: SplitProps) {
  const { tiles, setTiles } = useContext(TilesContext);

  const tile = tiles[id];
  if (tile.type !== "Horizontal Split" && tile.type !== "Vertical Split") {
    return;
  }

  const { amount, sizes, childIds } = tile;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (amount < 2 || amount > 8) {
      console.error("Too many tiles requested");
      return;
    }

    setTiles((prev) => {
      const next = [...prev];
      const nextSizes = new Array(amount).fill(100);
      const nextChildIds = [];

      for (let i = 0; i < amount; i++) {
        const childId = tiles.length + i;
        next[childId] = getDefaultProperties(null);
        nextChildIds.push(childId);
      }

      next[id] = {
        type: tile.type as "Horizontal Split" | "Vertical Split",
        amount,
        sizes: nextSizes,
        childIds: nextChildIds,
      };
      return next;
    });
  }

  function changeTileAmount(e: ChangeEvent<HTMLInputElement>) {
    setTiles((prev) => {
      const next = [...prev];
      next[id] = { ...next[id], amount: Number(e.target.value) } as SplitTile;
      return next;
    });
  }

  function changeSizes(sizes: number[]) {
    setTiles((prev) => {
      const next = [...prev];
      next[id] = { ...next[id], sizes } as SplitTile;
      return next;
    });
  }

  if (childIds.length === 0) {
    return (
      <form onSubmit={handleSubmit}>
        <label>How many tiles should there be?</label>
        <br />
        <input
          type="range"
          min={2}
          max={8}
          value={amount}
          onChange={changeTileAmount}
        />
        {amount}

        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }

  return (
    <SplitPane
      split={orientation}
      sizes={sizes}
      onChange={changeSizes}
      sashRender={() => undefined}
    >
      {childIds.map((childId) => (
        <Tile key={childId} id={childId} />
      ))}
    </SplitPane>
  );
}
