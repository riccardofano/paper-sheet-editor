import ArrayInput from "./ArrayInput";
import NumberInput from "./NumberInput";
import StringInput from "./StringInput";

export function chooseInputType<T>(
  tileId: number,
  label: string,
  value: T,
  handleChange: (value: T) => void
): JSX.Element {
  if (Array.isArray(value)) {
    return <ArrayInput tileId={tileId} label={label} values={value} />;
  }

  switch (typeof value) {
    case "string": {
      return (
        <StringInput
          label={label}
          value={value}
          handleChange={handleChange as (value: string) => void}
        />
      );
    }
    case "number": {
      return (
        <NumberInput
          label={label}
          value={value}
          handleChange={handleChange as (value: number) => void}
        />
      );
    }
    default: {
      return <></>;
    }
  }
}
