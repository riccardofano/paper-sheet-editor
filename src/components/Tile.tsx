import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import SplitPane from "split-pane-react";
import "../components/Split.css";

const tileTypes = ["Vertical Split", "Horizontal Split", "Text"] as const;
type TileType = (typeof tileTypes)[number];

const layoutCSS = {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Tile() {
  const [tileType, setTileType] = useState<TileType | null>(null);

  return (
    <div style={{ ...layoutCSS }}>{chooseType(tileType, setTileType)}</div>
  );
}

function chooseType(
  tileType: TileType | null,
  setTileType: Dispatch<SetStateAction<TileType | null>>
) {
  switch (tileType) {
    case "Text":
      return <Text />;
    case "Vertical Split":
      return (
        <Split type="vertical">
          <Tile />
          <Tile />
        </Split>
      );
    case "Horizontal Split":
      return (
        <Split type="horizontal">
          <Tile />
          <Tile />
        </Split>
      );
    default:
      return <TypeSelection setType={setTileType} />;
  }
}

interface TypeSelectionProps {
  setType: Dispatch<SetStateAction<TileType | null>>;
}

function TypeSelection({ setType }: TypeSelectionProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const type = formData.get("tileType");
    if (!type) {
      return;
    }

    setType(type as TileType);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pick the tile type:
        <select name="tileType" defaultValue={tileTypes[0]}>
          {tileTypes.map((tt) => (
            <option value={tt}>{tt}</option>
          ))}
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

function Text() {
  const [text, setText] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.currentTarget.value);
  }

  return <input type="text" value={text} onChange={handleChange} />;
}

interface SplitProps {
  type: "vertical" | "horizontal";
  children: JSX.Element[];
}

function Split({ children, type }: SplitProps) {
  const [sizes, setSizes] = useState<(number | string)[]>([100, 100]);

  return (
    <SplitPane
      split={type}
      sizes={sizes}
      onChange={setSizes}
      sashRender={() => undefined}
    >
      {children}
    </SplitPane>
  );
}
