"use client";

import type { FormData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface Step5UserInfoProps {
  email: string;
  phone: string; // Assuming phone is also needed for future use
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void; // Optional for future use
}

export function Step5UserInfo({ email, phone, onEmailChange, onPhoneChange }: Step5UserInfoProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEmailChange(event.target.value);
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
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="Enter your phone number"
          className="mt-1"
        />
      </div>
    </div>
  );
}
