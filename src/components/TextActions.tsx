import { useState } from "react";

const FONT_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

export default function TextActions() {
  const [fontSize, setFontSize] = useState(4);

  return (
    <>
      <button onClick={() => document.execCommand("bold", false)}>Bold</button>
      <button onClick={() => document.execCommand("italic")}>Italic</button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (fontSize < 1 || fontSize > 7) return;
          document.execCommand("fontSize", false, String(fontSize));
        }}
      >
        <select
          name="font-size"
          value={fontSize}
          onChange={(e) => setFontSize(+e.target.value)}
        >
          {FONT_SIZES.map((value, i) => (
            <option key={i} value={i + 1}>
              {value}
            </option>
          ))}
        </select>
        <button>Change font size</button>
      </form>
    </>
  );
}
