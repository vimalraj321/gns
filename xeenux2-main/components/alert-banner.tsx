"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function AlertBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    // <div className="fixed w-[80%] md:w-auto mx-auto bottom-6 left-1/2 transform -translate-x-1/2 z-50">
    //   <div className="bg-[#F0B90B]  space-y-2 w-full rounded-2xl shadow-lg p-3 px-4 overflow-hidden">
    //     <p className="text-[#eeeeee] outline-4 text-xs md:text-lg font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] pb-2">
    //       Join Seed Sale - Make 10x at listing
    //     </p>
    //     <span className="text-black text-xs md:text-sm font-medium leading-y-10">
    //       Refer and Earn <br /> Get 30% referral rewards (15% USDT + 15% XEE)
    //     </span>
    //     <div className="flex items-center space-x-4">
    //       <button
    //         className="bg-white text-black w-full text-xs px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
    //       >
    //         BUY $XEE 
    //       </button>
    //       <button
    //         onClick={() => setIsVisible(false)}
    //         className="text-black hover:text-white transition-colors"
    //       >
    //         <X className="h-5 w-5" />
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="fixed w-[80%] md:w-auto mx-auto bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-[#F0B90B] space-y-2 w-full rounded-2xl shadow-lg p-4 overflow-hidden">
        <p className="text-black text-lg md:text-xl font-bold drop-shadow-md pb-2">
          Join Presale - Earn 10X at Listing
        </p>
        <span className="text-black text-sm md:text-lg font-medium">
          Refer and Earn <br /> Get 30% Referral Rewards (15% USDT + 15% XEE)
        </span>
        <p className="text-black text-xs md:text-sm font-medium pt-2">
          Don't miss this Opportunity
        </p>
        <div className="flex items-center space-x-4 pt-2">
          <button
            className="bg-white text-black w-full text-sm px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            JOIN NOW
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-black hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}