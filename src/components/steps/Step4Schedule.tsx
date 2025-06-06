"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { FormData } from "@/types";

interface Step4ScheduleProps {
  formData: FormData;
  onSelectDate: (date?: Date) => void;
}

export function Step4Schedule({ formData, onSelectDate }: Step4ScheduleProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <CalendarDays className="h-6 w-6 text-accent" />
        <h2 className="text-xl font-semibold font-headline">Select Your Service Schedule</h2>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !formData.scheduleDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formData.scheduleDate ? format(formData.scheduleDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={formData.scheduleDate}
            onSelect={onSelectDate}
            initialFocus
            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } // Disable past dates
          />
        </PopoverContent>
      </Popover>
      {formData.scheduleDate && <p className="text-sm text-muted-foreground">Selected date: {format(formData.scheduleDate, "MMMM dd, yyyy")}</p>}
    </div>
  );
}
