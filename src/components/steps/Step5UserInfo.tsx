"use client";

import type { FormData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface Step5UserInfoProps {
  email: string;
  onEmailChange: (email: string) => void;
}

export function Step5UserInfo({ email, onEmailChange }: Step5UserInfoProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEmailChange(event.target.value);
  };

  // Placeholder function to collect all parameters
  const collectAllParameters = () => {
    // In a real application, you would collect data from all previous steps
    // and return an object with all the booking details.
    return {
      email: email,
      // ... other parameters from previous steps
    };
  };

  const handleSubmitBooking = async () => {
    const bookingData = collectAllParameters();
    try {
      const response = await fetch("https://data.com/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      // Handle the response as needed (e.g., show a success message, navigate to the next step)
    } catch (error) {}
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Mail className="h-6 w-6 text-accent" />
        <h2 className="text-xl font-semibold font-headline">Your Info</h2>
      </div>
      <p className="text-muted-foreground">Please provide your email to send you the booking details.</p>
      <div className="space-y-2">
        <Label htmlFor="email" className="font-medium">Email Address</Label>
        <Input 
          type="email" 
          id="email" 
          placeholder="you@example.com" 
          value={email}
          onChange={handleInputChange}
          required 
        />
      </div>
    </div>
  );
}
