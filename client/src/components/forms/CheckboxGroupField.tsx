import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxOption {
  value: string;
  label: string;
  id: string;
}

interface CheckboxGroupFieldProps {
  label: string;
  selectedValues: string[];
  onValueChange: (value: string, checked: boolean) => void;
  options: CheckboxOption[];
  required?: boolean;
  className?: string;
}

export function CheckboxGroupField({
  label,
  selectedValues,
  onValueChange,
  options,
  required = false,
  className = "mt-4 space-y-3"
}: CheckboxGroupFieldProps) {
  return (
    <div>
      <Label className="text-base font-medium">
        {label} {required && "*"} {required && "(Select all that apply)"}
      </Label>
      <div className={className}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={selectedValues.includes(option.value)}
              onCheckedChange={(checked) => onValueChange(option.value, checked as boolean)}
            />
            <Label htmlFor={option.id}>{option.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}