"use client";

import Image from 'next/image';
import { CheckCircle2 } from "lucide-react";

export function Step6Confirmation({formData}: { formData: { email: string; phone: string } }) {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
      </div>
      <h2 className="text-2xl font-semibold font-headline">Thank You for Requesting Your Service!</h2>
      <p className="text-lg text-muted-foreground">
        An agent will reach out to you shortly at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong> to complete the service details and confirm your booking.
      </p>
      <div className="flex justify-center">
        <img
          src="/images/monkeywindow.png" // Adjust the path as needed
          alt="Clean windows"
          width={300}
          height={200}
          className="rounded-lg shadow-md"
          data-ai-hint="clean window"
        />
      </div>
      <p className="text-sm text-muted-foreground">We look forward to making your windows sparkle!</p>
    </div>
  );
}
