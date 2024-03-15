import { FormEvent, useState } from "react";
import SplitPane from "split-pane-react";

import "../components/Split.css";
import Tile from "./Tile";

interface SplitProps {
  type: "vertical" | "horizontal";
}

export default function Split({ type }: SplitProps) {
  const [tileAmount, setTileAmount] = useState(2);
  const [sizes, setSizes] = useState<(number | string)[]>([]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (tileAmount < 2 || tileAmount > 8) {
      console.error("Too many tiles requested");
      return;
    }

    setSizes(new Array(tileAmount).fill(100));
  }

  if (sizes.length === 0) {
    return (
      <form onSubmit={handleSubmit}>
        <label>How many tiles should there be?</label>
        <br />
        <input
          type="range"
          min={2}
          max={8}
          value={tileAmount}
          onChange={(e) => setTileAmount(Number(e.currentTarget.value))}
        />
        {tileAmount}

        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }

  return (
    <SplitPane
      split={type}
      sizes={sizes}
      onChange={setSizes}
      sashRender={() => undefined}
    >
      {sizes.map((_, i) => (
        <Tile key={i} />
      ))}
    </SplitPane>
  );
}
