"use client";

import { Button } from "./button";
import { SUPPORTED_TOKENS } from "@/lib/constants";

interface TokenSelectorProps {
  selectedToken: string;
  token: string;
  onSelect: (token: string) => void;
}

export function TokenSelector({ selectedToken, onSelect }: TokenSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg md:text-2xl font-medium text-gray-200">
        Step 1 - Select the Payment Method (BEP20)
      </h2>
      
      <div className="flex flex-wrap gap-4">
        {Object.entries(SUPPORTED_TOKENS).map(([symbol, details]) => (
          <Button
            key={symbol}
            variant={selectedToken === symbol ? "default" : "outline"}
            onClick={() => onSelect(symbol)}
            className="flex items-center gap-2"
          >
            <img src={details.icon} alt={symbol} className="w-6 h-6" />
            {symbol}
          </Button>
        ))}
      </div>
    </div>
  );
}