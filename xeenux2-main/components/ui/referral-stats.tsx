"use client";

import { Copy } from "lucide-react";
import { Button } from "./button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ReferralStatsProps {
  referralLink: string;
  totalEarningsUSDT: string;
  totalEarningsucc: string;
  totalEarningsBNB: string;
  totalDepositBNB: string;
  totalDepositUSDT: string;
}

export function ReferralStats({
  referralLink,
  totalEarningsUSDT,
  totalEarningsucc,
  totalDepositBNB,
  totalDepositUSDT,
  totalEarningsBNB,
}: ReferralStatsProps) {
  const { toast } = useToast();
  const [copiedMessage, setCopiedMessage] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 3000); // Hide after 3 seconds
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy. Please try again.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#00d4ff]/20">
          <div className="text-sm text-gray-400 mb-1">Total Deposit (USDT)</div>
          <div className="text-2xl font-bold text-primary">{totalDepositUSDT}</div>
        </div>
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#00d4ff]/20">
          <div className="text-sm text-gray-400 mb-1">Total Deposit (BNB)</div>
          <div className="text-2xl font-bold text-primary">{totalDepositBNB}</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#00d4ff]/20">
          <div className="text-sm text-gray-400 mb-1">Total Earnings (USDT)</div>
          <div className="text-2xl font-bold text-primary">{totalEarningsUSDT}</div>
        </div>
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#00d4ff]/20">
          <div className="text-sm text-gray-400 mb-1">Total Earnings (BNB)</div>
          <div className="text-2xl font-bold text-primary">{totalEarningsBNB}</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-[#00d4ff]/20">
          <div className="text-sm text-gray-400 mb-1">Total Earnings (XEE)</div>
          <div className="text-2xl font-bold text-primary">{totalEarningsucc}</div>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="w-full bg-black/50 border border-[#00d4ff]/20 rounded-xl px-4 py-3 pr-24 text-sm"
        />
        <Button
          size="sm"
          onClick={copyToClipboard}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-black"
        >
          <Copy className="w-4 h-4 mr-1" />
          Copy
        </Button>

        {/* Success Message */}
        <div
          className={`absolute right-2 top-0 transform ${
            copiedMessage
              ? "translate-y-[-120%] opacity-100"
              : "translate-y-[-150%] opacity-0"
          } bg-primary text-black text-xs font-bold px-2 py-1 rounded-md shadow-md transition-all duration-300`}
        >
          Copied!
        </div>
      </div>
    </div>
  );
}