import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import SplitPane from "react-split-pane";

const tileTypes = ["Vertical Split", "Horizontal Split", "Text"] as const;
type TileType = (typeof tileTypes)[number];

export default function Tile() {
  const [tileType, setTileType] = useState<TileType | null>(null);

  switch (tileType) {
    case "Text":
      return <Text />;
    case "Vertical Split":
      return (
        <SplitPane
          split="vertical"
          defaultSize={100}
          resizerStyle={{ width: 10, backgroundColor: "black" }}
        >
          <Tile />
          <Tile />
        </SplitPane>
      );
    case "Horizontal Split":
      return (
        <SplitPane
          split="horizontal"
          defaultSize={100}
          resizerStyle={{ height: 10, backgroundColor: "black" }}
        >
          <Tile />
          <Tile />
        </SplitPane>
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
