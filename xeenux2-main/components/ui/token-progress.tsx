"use client";

import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SUPPORTED_TOKENS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { AmountInput } from "./amount-input";
import { PurchaseButton } from "./purchase-button";
import { ReferralStats } from "./referral-stats";
import { ActivitiesTable, Activity } from "@/components/ui/activities-table";
import { b2f, usePresale } from "@/hooks/usePresale";

interface TokenProgressProps {
  tokenUSDTPrice: number;
  tokenBNBPrice: number;
  tokensSold: number;
  totalTokens: number;
  userId: number;
  userDepositsUSDT: number;
  userDepositsBNB: number;
  userEarningsBNB: number;
  userEarningsUSDT: number;
  userTokens: number;
  activities: Activity[];
  activitiesLength: number;
  progress: number;
}

export function TokenProgress({
  tokenUSDTPrice,
  tokenBNBPrice,
  tokensSold,
  totalTokens,
  userId,
  userDepositsUSDT,
  userDepositsBNB,
  progress,
  userEarningsBNB,
  userEarningsUSDT,
  userTokens,
  activities,
  activitiesLength,
}: TokenProgressProps) {
  const [selectedToken, setSelectedToken] = useState("USDT");
  const [amount, setAmount] = useState("");
  const { status, buyWithUSDT, buyWithBNB } = usePresale();
  const [showActivities, setShowActivities] = useState(false);

  const handleAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const calculateTokenAmount = useCallback(
    (inputAmount: string) => {
      const numAmount = parseFloat(inputAmount) || 0;
      return formatCurrency(
        numAmount / (selectedToken === "USDT" ? tokenUSDTPrice : tokenBNBPrice)
      );
    },
    [selectedToken, tokenUSDTPrice, tokenBNBPrice]
  );

  const handlePurchase = async () => {
    if (!amount) return;

    if (selectedToken === "USDT") {
      await buyWithUSDT(amount);
    } else if (selectedToken === "BNB") {
      await buyWithBNB(amount);
    }
  };

  return (
    <div className="space-y-6 backdrop-blur-xl bg-background rounded-3xl p-6 md:p-8 overflow-x-auto">
      <div className="flex md:flex-row justify-between md:justify-between items-center md:items-center gap-4">
        <div className="flex items-start gap-2 flex-col">
          <span className="py-1 px-3 text-[8px] md:text-sm glass-card  text-white font-semibold rounded-full">
            Current price
          </span>
          <div className="flex items-center justify-center gap-1">
            <Image
              src="/images/xeenux.png"
              alt="xee-logo"
              width={12}
              height={12}
              className="md:w-5 md:h-5 w-3 h-3"
            />
            <span className="text-gray-200 md:text-sm text-[8px]">1 XEE =</span>
            <div className="flex items-center gap-2">
              <img
                src="/images/tether.svg"
                alt="USDT"
                className="w-5 h-5"
              />
              <span className="text-blue-400 md:text-sm text-[8px] font-semibold">
                {formatCurrency(tokenUSDTPrice, 3)} USDT
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-2 flex-col">
          <span className="py-1 px-3 glass-card text-[8px] md:text-sm  text-white font-semibold rounded-full">
            Next price
          </span>
          <div className="flex items-center justify-center gap-1">
            <Image
              src="/images/xeenux.png"
              alt="xee-logo"
              width={12}
              height={12}
              className="md:w-5 md:h-5 w-3 h-3"
            />
            <span className="text-gray-200 md:text-sm text-[8px]">1 XEE =</span>
            <div className="flex items-center gap-2">
              <img
                src="/images/tether.svg"
                alt="USDT"
                className="w-3 h-3 md:w-5 md:h-5"
              />
              <span className="text-blue-400 md:text-sm text-[8px] font-semibold">
                0.100 USDT
              </span>
            </div>
          </div>
        </div>
      </div>

      <Progress
        value={progress}
        tokensSold={tokensSold}
        totalTokens={totalTokens}
        className="h-4 rounded-xl bg-black"
        indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-400"
      />

      <div className="pt-10 p-1 md:p-8">
        <h2 className="text-sm md:text-xl mb-8 text-white">
          Step 1 -{" "}
          <span className="text-gray-400">
            Select the Payment Method (BEP20)
          </span>
        </h2>

        <div className="flex w-full md:w-[40%] mx-auto items-center justify-center p-1  glass-card gap-4 mb-8 rounded-xl">
          {Object.entries(SUPPORTED_TOKENS).map(([symbol, details]) => (
            <Button
              key={symbol}
              variant={selectedToken === symbol ? "secondary" : "ghost"}
              onClick={() => setSelectedToken(symbol)}
              className="flex items-center gap-1 w-full text-white font-semibold"
            >
              <img src={details.icon} alt={symbol} className="w-6 h-6" />
              {symbol}
            </Button>
          ))}
        </div>

        <h2 className="text-sm md:text-xl mb-8 text-white">
          Step 2 -{" "}
          <span className="text-gray-400">
            Enter the Amount of Token You Would Like to Purchase
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4">
          <AmountInput
            value={amount}
            onChange={handleAmountChange}
            token={selectedToken}
            tokenIcon={SUPPORTED_TOKENS[selectedToken].icon}
          />
          <AmountInput
            value={amount ? calculateTokenAmount(amount) : ""}
            onChange={() => {}}
            token="XEE"
            tokenIcon="/images/xeenux.png"
            readOnly
          />
        </div>

        <PurchaseButton
          status={status}
          onClick={handlePurchase}
          disabled={!amount || parseFloat(amount) <= 0}
        />
      </div>

      <div className="border-t border-blue-500/20 pt-6">
        <Button
          variant="secondary"
          onClick={() => setShowActivities(!showActivities)}
          className="w-full flex items-center justify-between text-left hover:bg-blue-500/50 hover:text-white"
        >
          <span className="text-lg font-medium">Recent Activities & Referrals</span>
          {showActivities ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </Button>
        
        {showActivities && (
          <div className="mt-6 space-y-6">
            <ReferralStats
              referralLink={`https://xeenux2.vercel.app/?ref=${userId}`}
              totalEarningsUSDT={b2f(userEarningsUSDT).toFixed(2)}
              totalEarningsucc={b2f(userTokens).toFixed(2)}
              totalEarningsBNB={b2f(userEarningsBNB).toFixed(2)}
              totalDepositBNB={b2f(userDepositsBNB).toFixed(2)}
              totalDepositUSDT={b2f(userDepositsUSDT).toFixed(2)}
            />

            <div>
              <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
              <ActivitiesTable activities={activities} length={activitiesLength} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
