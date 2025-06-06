"use client";

import type { FormData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import React from "react";

interface Step5UserInfoProps {
  email: string;
  onEmailChange: (email: string) => void;
}

export function Step5UserInfo({ email, onEmailChange }: Step5UserInfoProps) {
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
    </div>
  );
}
