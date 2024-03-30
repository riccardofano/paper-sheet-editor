import { ChangeEvent } from "react";

interface BooleanInputProps {
  label: string;
  value: boolean;
  handleChange: (change: boolean) => void;
}

export default function BooleanInput({
  label,
  value,
  handleChange,
}: BooleanInputProps) {
  function giveChangedValue(e: ChangeEvent<HTMLInputElement>) {
    handleChange(e.target.checked);
  }

  return (
    <label>
      {label}
      <input type="checkbox" checked={value} onChange={giveChangedValue} />
    </label>
  );
}
