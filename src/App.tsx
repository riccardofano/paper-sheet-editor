import { useState } from "react";
import Preview from "./components/Preview";

function App() {
  const [paragraphs, setParagraphs] = useState<string[]>([""]);

  function updatePiece(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const nextParagraphs = [...paragraphs];
    nextParagraphs[index] = event.currentTarget.value;
    setParagraphs(nextParagraphs);
  }

  return (
    <>
      <section>
        {paragraphs.map((piece, i) => (
          <input
            type="text"
            value={piece}
            onChange={(e) => updatePiece(e, i)}
          />
        ))}
        <button onClick={() => setParagraphs([...paragraphs, ""])}>
          Add new paragraph
        </button>
      </section>
      <Preview textPieces={paragraphs} />
    </>
  );
}

export default App;
