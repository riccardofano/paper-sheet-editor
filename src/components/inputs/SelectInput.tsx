import { ChangeEvent } from "react";

interface SelectInputProps {
  label: string;
  value: string;
  options: string[];
  handleChange: (change: string) => void;
}

export default function SelectInput({
  label,
  value,
  options,
  handleChange,
}: SelectInputProps) {
  function giveChangedValue(e: ChangeEvent<HTMLSelectElement>) {
    // Since fonts are the only thing that use this I'll just add the new font here for now
    const family = e.target.value;

    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURI(
      family
    )}:wght@400;700&display=swap`;
    link.rel = "stylesheet";
    link.crossOrigin = "anonymous";
    document.getElementsByTagName("head")[0].appendChild(link);

    handleChange(family);
  }

  return (
    <label>
      {label}
      <br />
      <select value={value} onChange={giveChangedValue}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
