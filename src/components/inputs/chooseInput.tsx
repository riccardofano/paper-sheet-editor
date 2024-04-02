import ArrayInput from "./ArrayInput";
import BooleanInput from "./BooleanInput";
import NumberInput from "./NumberInput";
import StringInput from "./StringInput";

import { FONTS } from "../../fonts";
import SelectInput from "./SelectInput";

const SPECIAL_KEYS: Record<string, string> = {
  font: "select",
} as const;

const SELECTION_LISTS: Record<string, string[]> = {
  font: FONTS,
} as const;

export function chooseInputType<T>(
  tileId: number,
  label: string,
  value: T,
  handleChange: (value: T) => void,
): JSX.Element {
  if (Array.isArray(value)) {
    return (
      <ArrayInput key={label} tileId={tileId} label={label} values={value} />
    );
  }

  const type = SPECIAL_KEYS[label] ?? typeof value;

  switch (type) {
    case "select": {
      return (
        <SelectInput
          key={label}
          label={label}
          options={SELECTION_LISTS[label]}
          value={value as string}
          handleChange={handleChange as (value: string) => void}
        />
      );
    }
    case "string": {
      return (
        <StringInput
          key={label}
          label={label}
          value={value as string}
          handleChange={handleChange as (value: string) => void}
        />
      );
    }
    case "number": {
      return (
        <NumberInput
          key={label}
          label={label}
          value={value as number}
          handleChange={handleChange as (value: number) => void}
        />
      );
    }
    case "boolean": {
      return (
        <BooleanInput
          key={label}
          label={label}
          value={value as boolean}
          handleChange={handleChange as (value: boolean) => void}
        />
      );
    }
    default: {
      return <></>;
    }
  }
}
