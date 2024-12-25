"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SUPPORTED_TOKENS } from '@/lib/constants';

export default function TokenSale() {
  const [selectedToken, setSelectedToken] = useState('USDT');
  const [amount, setAmount] = useState('');

  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-black/50 backdrop-blur-xl border glass-card border-primary/20 rounded-xl p-8">
        <h2 className="text-2xl mb-8 text-gray-400">Step 1 - Select the Payment Method (BEP20)</h2>
        
        <div className="flex gap-4 mb-8">
          {Object.entries(SUPPORTED_TOKENS).map(([symbol, details]) => (
            <Button
              key={symbol}
              variant={selectedToken === symbol ? "default" : "outline"}
              onClick={() => setSelectedToken(symbol)}
              className="flex items-center gap-2"
            >
              <img src={details.icon} alt={symbol} className="w-6 h-6" />
              {symbol}
            </Button>
          ))}
        </div>

        <h2 className="text-2xl mb-8">Step 2 - Enter the Amount of Token You Would Like to Purchase</h2>
        
        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="text-xl"
            />
          </div>
          <div className="flex-1">
            <Input
              type="number"
              value={amount ? (Number(amount) * 0.37).toString() : ''}
              readOnly
              placeholder="0"
              className="text-xl"
            />
          </div>
        </div>

        <Button className="w-full text-lg py-6" size="lg">
          Buy $XEE
        </Button>
      </div>
    </section>
  );
}