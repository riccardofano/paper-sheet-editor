import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

const tileTypes = ["Split", "Text"] as const;
type TileType = (typeof tileTypes)[number];

export default function Tile() {
  const [tileType, setTileType] = useState<TileType | null>(null);

  switch (tileType) {
    case "Text":
      return <Text />;
    case "Split":
      return (
        <section>
          <Tile />
          <Tile />
        </section>
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
