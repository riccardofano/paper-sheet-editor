import { useState } from "react";

export default function Text() {
  const [text, setText] = useState("");

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.currentTarget.value)}
    />
  );
}
