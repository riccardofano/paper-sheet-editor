export default function Text() {
  return (
    <span
      contentEditable
      suppressContentEditableWarning
      style={{ minWidth: "1rem", border: "1px dashed gray" }}
    >
      Insert your text here
    </span>
  );
}
