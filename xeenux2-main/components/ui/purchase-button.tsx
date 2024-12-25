"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { PurchaseStatus } from "@/hooks/usePresale";
import { cn } from "@/lib/utils";

interface PurchaseButtonProps {
  status: PurchaseStatus;
  onClick: () => void;
  disabled?: boolean;
}

export function PurchaseButton({ status, onClick, disabled }: PurchaseButtonProps) {
  const getButtonContent = () => {
    switch (status) {
      case PurchaseStatus.APPROVING:
        return (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Approving USDT...
          </>
        );
      case PurchaseStatus.APPROVED:
        return (
          <>
            <Check className="mr-2 h-4 w-4" />
            USDT Approved - Click to Buy
          </>
        );
      case PurchaseStatus.PURCHASING:
        return (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing purchase...
          </>
        );
      case PurchaseStatus.CONFIRMED:
        return (
          <>
            <Check className="mr-2 h-4 w-4" />
            Purchase confirmed!
          </>
        );
      case PurchaseStatus.ERROR:
        return (
          <>
            <AlertCircle className="mr-2 h-4 w-4" />
            Try again
          </>
        );
      default:
        return "Buy $XEE";
        
    }
  };

  const getButtonVariant = () => {
    switch (status) {
      case PurchaseStatus.CONFIRMED:
        return "success";
      case PurchaseStatus.ERROR:
        return "destructive";
      default:
        return "default";
    }
  };

  const getButtonClass = () => {
    return cn(
      "w-full h-12 text-lg font-semibold transition-all duration-200",
      status === PurchaseStatus.APPROVED && "bg-green-500 hover:bg-green-600",
      status === PurchaseStatus.CONFIRMED && "bg-green-600",
      status === PurchaseStatus.ERROR && "bg-red-500 hover:bg-red-600"
    );
  };

  return (
    <Button
      className={getButtonClass()}
      onClick={onClick}
      disabled={disabled || [
        PurchaseStatus.APPROVING,
        PurchaseStatus.PURCHASING,
        PurchaseStatus.CONFIRMED
      ].includes(status)}
      // variant={getButtonVariant()}
    >
      {getButtonContent()}
    </Button>
  );
}