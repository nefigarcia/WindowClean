"use client";

import Image from 'next/image';
import { MessageCircle } from "lucide-react";

export function Step7Negotiation() {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <MessageCircle className="h-16 w-16 text-accent" />
      </div>
      <h2 className="text-2xl font-semibold font-headline">Thank You for Your Interest!</h2>
      <p className="text-lg text-muted-foreground">
        We understand that pricing is important. We might be able to work out a better price for you.
      </p>
      <p className="text-lg text-muted-foreground">
        Please contact us at <a href="mailto:windowclean@monkeyshine.rosystems.net" className="text-accent font-semibold hover:underline">windowclean@monkeyshine.rosystems.net</a> to discuss your needs.
      </p>
      <div className="flex justify-center">
        <img
          src="/images/monkeywindow.png"
          alt="Negotiation"
          width={300}
          height={200}
          className="rounded-lg shadow-md"
          data-ai-hint="handshake deal"
        />
      </div>
      <p className="text-sm text-muted-foreground">We're here to help find a solution that works for you.</p>
    </div>
  );
}
