// components/NumberInput.js
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNumberInput } from '../hooks/useNumberInput';

export const NumberInput = ({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  allowZero = true,
  description,
  className = "",
}) => {
  const { inputProps } = useNumberInput(value, {
    min,
    max,
    step,
    allowZero,
    onChange,
  });

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        className={className}
        {...inputProps}
      />
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
};
