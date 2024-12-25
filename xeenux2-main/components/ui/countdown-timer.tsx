"use client";

import { useEffect, useState } from "react";
import type { CountdownTimer } from "@/types";

interface CountdownProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<CountdownTimer>({
    days: 40,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    // return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 md:gap-4 justify-center">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-4 md:min-w-[100px] text-white border glass-card border-primary/20">
            <div className="text-md md:text-4xl font-bold">
              {String(value).padStart(2, "0")}
            </div>
          </div>
          <div className="text-xs md:text-sm text-muted-foreground uppercase mt-1">
            {key}
          </div>
        </div>
      ))}
    </div>
  );
}
