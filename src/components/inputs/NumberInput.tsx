import { ChangeEvent } from "react";

interface NumberInputProps {
  label: string;
  value: number;
  handleChange: (change: number) => void;
}

export default function NumberInput({
  label,
  value,
  handleChange,
}: NumberInputProps) {
  function giveChangedValue(e: ChangeEvent<HTMLInputElement>) {
    handleChange(+e.target.value);
  }

  return (
    <label>
      {label}
      <br />
      <input
        type="range"
        min="2"
        max="8"
        value={value}
        onChange={giveChangedValue}
      />
    </label>
  );
}
