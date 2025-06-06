"use client";

import { Progress } from "@/components/ui/progress";

interface ProgressBarDisplayProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBarDisplay({ currentStep, totalSteps }: ProgressBarDisplayProps) {
  const progressPercentage = Math.max(0, Math.min(100, (currentStep / totalSteps) * 100));

  return (
    <div className="w-full">
      <Progress value={progressPercentage} className="w-full h-3" aria-label={`Step ${currentStep} of ${totalSteps}`} />
    </div>
  );
}
