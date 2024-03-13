interface PreviewProps {
  textPieces: string[];
}

export default function Preview({ textPieces }: PreviewProps) {
  return (
    <main>
      {textPieces.map((piece) => (
        <p>{piece}</p>
      ))}
    </main>
  );
}
