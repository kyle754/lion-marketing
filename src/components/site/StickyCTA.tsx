"use client";

import { BOOKING_CTA, SITE } from "@/config/site";
import { Button } from "./Button";

export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-forecast-border bg-forecast-surface/95 p-3 shadow-forecast-lg backdrop-blur-md md:hidden">
      <Button href={SITE.bookingUrl} external className="w-full">
        {BOOKING_CTA}
      </Button>
    </div>
  );
}
