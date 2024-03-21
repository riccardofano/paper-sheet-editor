export default function TextActions() {
  function executeAction(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    action: string
  ) {
    e.preventDefault();
    document.execCommand(action, false);
  }

  return (
    <>
      <button onClick={(e) => executeAction(e, "bold")}>Bold</button>
      <button onClick={(e) => executeAction(e, "italic")}>Italic</button>
    </>
  );
}
