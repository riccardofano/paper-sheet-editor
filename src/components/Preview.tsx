interface PreviewProps {
  textPieces: string[];
}

export default function Preview({ textPieces }: PreviewProps) {
  return (
    <main>
      {textPieces.map((piece, i) => (
        <p key={i}>{piece}</p>
      ))}
    </main>
  );
}
