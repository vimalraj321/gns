"use client";

import { useEffect, useState } from "react";
import { CountdownTimer } from "../ui/countdown-timer";
import { TokenProgress } from "@/components/ui/token-progress";
import { usePresale } from "@/providers/provider";
import { calculateTimeLeft } from "@/lib/utils";
import { CountdownTime } from "@/lib/types";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 2,
    hours: 1,
    minutes: 18,
    seconds: 44,
  });

  const { uccInfo, userUCCInfo, totalTokens } = usePresale();

  useEffect(() => {
    const targetDate = new Date("2024-12-31T00:00:00");
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen pt-20 flex mb-10 flex-col items-center justify-center overflow-hidden">
    {/* Updated Background Effects */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4c51ff,rgba(177,84,255,0.4),rgba(0,212,255,0.15),transparent_70%)]" />
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4c51ff]/20 rounded-full blur-3xl" />
  
    {/* Content */}
    <div className="relative z-10 container mx-auto px-4 mt-10 text-center">
      <h1 className="md:text-5xl text-3xl font-bold mb-2 w-fit backdrop-blur-lg text-transparent bg-clip-text bg-gradient-to-r mx-auto from-blue-500 via-purple-500 to-cyan-500">
        XEE SEED SALE
      </h1>
      
      <p className="md:text-md text-xs text-gray-400 mb-12">ENDS IN</p>
  
      <CountdownTimer targetDate={new Date("2025-01-04")} />
  
      {/* Stats Bar */}
      <div className="w-full mt-24 max-w-4xl mx-auto backdrop-blur-xl bg-black/60 rounded-3xl border border-[rgba(75,81,255,0.2)] overflow-hidden">
        <div className="grid grid-cols-3 p-6">
          <div className="text-left">
            <div className="text-xs md:text-sm text-gray-400 mb-1">USDT RAISED</div>
            <div className="text-xs md:text-lg font-bold text-[#00d4ff]">
              {uccInfo.totalInvestmentsUSDT} USDT
            </div>
            <div className="text-xs md:text-sm text-gray-400 mb-1">BNB RAISED</div>
            <div className="text-xs md:text-lg font-bold text-[#00d4ff]">
              {uccInfo.totalInvestmentsBNB.toFixed(4)} BNB
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs md:text-sm text-gray-400 mb-1">LISTING DATE</div>
            <div className="text-xs md:text-xl font-bold">Announced soon</div>
          </div>
          <div className="text-right">
            <div className="text-xs md:text-sm text-gray-400 mb-1">HOLDERS</div>
            <div className="text-xs md:text-xl font-bold text-[#00d4ff]">
              {parseInt(uccInfo.totalUsers.toString())}
            </div>
          </div>
        </div>
  
        <div className="">
          <TokenProgress
            tokenBNBPrice={uccInfo.priceBNB}
            tokenUSDTPrice={uccInfo.priceUSDT}
            userDepositsUSDT={userUCCInfo.usersInfo?.totalDepositUSDT ?? 0}
            userDepositsBNB={userUCCInfo.usersInfo?.totalDepositBNB ?? 0}
            userEarningsBNB={userUCCInfo.usersInfo?.refIncomeBNB ?? 0}
            userEarningsUSDT={userUCCInfo.usersInfo?.refIncomeUSDT ?? 0}
            userId={userUCCInfo.userId}
            userTokens={userUCCInfo.usersInfo?.totalTokens ?? 0}
            progress={
              uccInfo.totalTokensToBEDistributed &&
              (uccInfo.totalTokensToBEDistributed * 100) / 10000000
            }
            tokensSold={uccInfo.totalTokensToBEDistributed}
            totalTokens={10000000}
            activities={userUCCInfo.recentActivities}
            activitiesLength={userUCCInfo.activityLength}
          />
        </div>
      </div>
    </div>
  </section>
  );
}