"use client";

import type { FormData } from "@/types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sparkles } from "lucide-react";

interface Step2ServiceTypeProps {
  formData: FormData;
  onSelectServiceType: (value: 'Interior' | 'Exterior' | 'Interior & Exterior') => void;
}

const serviceTypeOptions = [
  { id: "type-interior", value: "Interior", label: "Interior Cleaning" },
  { id: "type-exterior", value: "Exterior Cleaning" },
  { id: "type-both", value: "Interior & Exterior Cleaning" },
] as const;

export function Step2ServiceType({ formData, onSelectServiceType }: Step2ServiceTypeProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Sparkles className="h-6 w-6 text-accent" />
        <h2 className="text-xl font-semibold font-headline">Select Service Cleaning Type</h2>
      </div>
      <RadioGroup
        value={formData.serviceType}
        onValueChange={onSelectServiceType}
        className="space-y-2"
      >
        {serviceTypeOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-secondary transition-colors">
            <RadioGroupItem value={option.value} id={option.id} />
            <Label htmlFor={option.id} className="text-base cursor-pointer flex-grow">{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
