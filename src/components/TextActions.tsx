import { ChangeEvent, useState } from "react";

const FONT_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

export default function TextActions() {
  const [fontSize, setFontSize] = useState(4);

  function updateFontSize(e: ChangeEvent<HTMLSelectElement>) {
    const newFontSize = +e.target.value;

    if (newFontSize < 1 || newFontSize > 7) return;

    setFontSize(newFontSize);
    document.execCommand("fontSize", false, String(newFontSize));
  }

  return (
    <div className="fields">
      <button onClick={() => document.execCommand("bold", false)}>
        <strong>Bold</strong>
      </button>
      <button onClick={() => document.execCommand("italic")}>
        <em>Italic</em>
      </button>

      <select value={fontSize} onChange={updateFontSize}>
        {FONT_SIZES.map((value, i) => (
          <option key={i} value={i + 1}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
