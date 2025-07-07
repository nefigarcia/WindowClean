
"use client";

import * as React from "react";
import { format, setHours, setMinutes, parse } from "date-fns";
import { Calendar as CalendarIcon, CalendarDays, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { FormData } from "@/types";

interface Step4ScheduleProps {
  formData: FormData;
  onSelectDate: (date?: Date) => void;
}

const hours = Array.from({ length: 9 }, (_, i) => 9 + i); // 9 AM to 5 PM (9 to 17)
const minutes = [0, 15, 30, 45];

export function Step4Schedule({ formData, onSelectDate }: Step4ScheduleProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(formData.scheduleDate);
  const [selectedHour, setSelectedHour] = React.useState<number>(
    formData.scheduleDate ? formData.scheduleDate.getHours() : 9
  );
  const [selectedMinute, setSelectedMinute] = React.useState<number>(
    formData.scheduleDate ? formData.scheduleDate.getMinutes() : 0
  );

  React.useEffect(() => {
    // Sync with formData if it changes externally
    if (formData.scheduleDate) {
      setSelectedDate(formData.scheduleDate);
      setSelectedHour(formData.scheduleDate.getHours());
      setSelectedMinute(formData.scheduleDate.getMinutes());
    } else {
      setSelectedDate(undefined);
      setSelectedHour(9); // Default hour
      setSelectedMinute(0); // Default minute
    }
  }, [formData.scheduleDate]);

  const handleDateTimeChange = (newDate?: Date, newHour?: number, newMinute?: number) => {
    const dateToUpdate = newDate || selectedDate;
    const hourToUpdate = newHour !== undefined ? newHour : selectedHour;
    const minuteToUpdate = newMinute !== undefined ? newMinute : selectedMinute;

    if (dateToUpdate) {
      let combinedDateTime = new Date(dateToUpdate);
      combinedDateTime = setHours(combinedDateTime, hourToUpdate);
      combinedDateTime = setMinutes(combinedDateTime, minuteToUpdate);
      combinedDateTime.setSeconds(0);
      combinedDateTime.setMilliseconds(0);
      onSelectDate(combinedDateTime);
    } else {
        onSelectDate(undefined); // Clear if no date
    }
  };
  
  const handleDateCalendarSelect = (date?: Date) => {
    setSelectedDate(date);
    handleDateTimeChange(date, undefined, undefined);
  };

  const handleHourChange = (hourString: string) => {
    const hour = parseInt(hourString, 10);
    setSelectedHour(hour);
    handleDateTimeChange(selectedDate, hour, undefined);
  };

  const handleMinuteChange = (minuteString: string) => {
    const minute = parseInt(minuteString, 10);
    setSelectedMinute(minute);
    handleDateTimeChange(selectedDate, undefined, minute);
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <CalendarDays className="h-6 w-6 text-accent" />
        <h2 className="text-xl font-semibold font-headline">Select Your Service Date & Time</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="date-picker-trigger">Date</Label>
          <Popover>
            <PopoverTrigger asChild id="date-picker-trigger">
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal mt-1",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            {!selectedDate && (
              <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateCalendarSelect}
                initialFocus
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } // Disable past dates
              />
            </PopoverContent>
            )
            }
            
          </Popover>
        </div>

        {selectedDate && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hour-select">Time - Hour</Label>
              <Select onValueChange={handleHourChange} value={String(selectedHour)}>
                <SelectTrigger id="hour-select" className="w-full mt-1">
                  <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map(hour => (
                    <SelectItem key={hour} value={String(hour)}>
                      {format(setHours(new Date(), hour), "h aa")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="minute-select">Minute</Label>
              <Select onValueChange={handleMinuteChange} value={String(selectedMinute)}>
                <SelectTrigger id="minute-select" className="w-full mt-1">
                  <SelectValue placeholder="Minute" />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map(minute => (
                    <SelectItem key={minute} value={String(minute)}>
                      {format(setMinutes(new Date(), minute), "mm")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {formData.scheduleDate && (
        <div className="p-3 bg-secondary rounded-md mt-4">
            <p className="text-sm font-medium text-secondary-foreground">
                Selected: {format(formData.scheduleDate, "MMMM dd, yyyy 'at' h:mm aa")}
            </p>
        </div>
      )}
    </div>
  );
}
