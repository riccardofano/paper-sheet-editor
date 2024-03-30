import { ChangeEvent } from "react";

interface StringInputProps {
  label: string;
  value: string;
  handleChange: (change: string) => void;
}

export default function StringInput({
  label,
  value,
  handleChange,
}: StringInputProps) {
  function giveChangedValue(e: ChangeEvent<HTMLInputElement>) {
    handleChange(e.target.value);
  }

  return (
    <label>
      {label}
      <br />
      <input type="text" value={value} onChange={giveChangedValue} />
    </label>
  );
}
