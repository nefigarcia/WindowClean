"use client";

import type { FormData } from "@/types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ClipboardList } from "lucide-react";

interface Step1WindowsProps {
  formData: FormData;
  onSelectWindows: (value: '1-5' | '6-10' | '11-20') => void;
}

const windowOptions = [
  { id: "windows-1-5", value: "1-5", label: "1-5 Windows" },
  { id: "windows-6-10", value: "6-10", label: "6-10 Windows" },
  { id: "windows-11-20", value: "11-20", label: "11-20 Windows" },
] as const;


export function Step1Windows({ formData, onSelectWindows }: Step1WindowsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <ClipboardList className="h-6 w-6 text-accent" />
        <h2 className="text-xl font-semibold font-headline">How many windows to be cleaned?</h2>
      </div>
      <RadioGroup
        value={formData.windows}
        onValueChange={onSelectWindows}
        className="space-y-2"
      >
        {windowOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-secondary transition-colors">
            <RadioGroupItem value={option.value} id={option.id} />
            <Label htmlFor={option.id} className="text-base cursor-pointer flex-grow">{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
