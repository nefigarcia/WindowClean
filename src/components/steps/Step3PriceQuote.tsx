"use client";

import { Button } from "@/components/ui/button";
import { Check, XIcon as X } from "lucide-react"; // Renamed X to XIcon to avoid conflict

interface Step3PriceQuoteProps {
  price: number | null;
}

export function Step3PriceQuote({ price }: Step3PriceQuoteProps) {

  if (price === null) {
    return <p>Calculating your price...</p>;
  }

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-xl font-semibold font-headline">Your Estimated Price</h2>
      <p className="text-4xl font-bold text-accent">${price.toFixed(2)}</p>
      <p className="text-muted-foreground">This is an estimate. Final price may vary based on window condition and accessibility.</p>
      <p className="text-lg font-medium">Would you like to book your service?</p>
    </div>
  );
}
