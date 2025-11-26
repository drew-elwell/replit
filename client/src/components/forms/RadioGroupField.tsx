import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioOption {
  value: string;
  label: string;
  id: string;
}

interface RadioGroupFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: RadioOption[];
  required?: boolean;
  className?: string;
}

export function RadioGroupField({
  label,
  value,
  onValueChange,
  options,
  required = false,
  className = "mt-4 space-y-3"
}: RadioGroupFieldProps) {
  return (
    <div>
      <Label className="text-base font-medium">
        {label} {required && "*"}
      </Label>
      <RadioGroup 
        value={value} 
        onValueChange={onValueChange}
        className={className}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.id} />
            <Label htmlFor={option.id}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}