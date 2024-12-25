"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Logo } from "./Logo";
import { TextContent } from "./TextContent";
import { ActionButton } from "./ActionButton";
import Image from "next/image";

export function AlertBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleJoinNow = () => {
    // Handle join action
    console.log("Join clicked");
  };

  return (
    <div className="fixed w-full max-w-2xl mx-auto bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-4">
      <div className="relative bg-primary  shadow-2xl p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-black hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="space-y-4 w-full">
          <div className="mx-auto w-fit flex items-center justify-center ">
          <Image
            src="/images/xeenux.png"
            alt="xee-logo"
            width={100}
            height={100}
            priority
            className=" border px-1 border-black rounded-xl"
          />
          </div>

          <TextContent
            title="Join Presale - Earn 10X at Listing"
            subtitle="Refer and Earn"
            details="Get 30% Referral Rewards"
            details2="( 15% USDT + 15% XEE )"
          />

          <div className="text-center space-y-6">
            <p className="text-sm md:text-md font-black text-white
              drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Don't miss this Opportunity
            </p>
            <div className="flex justify-center">
              <ActionButton onClick={handleJoinNow} />
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 via-yellow-500/20 to-yellow-600/30 pointer-events-none" />
      </div>
    </div>
  );
}