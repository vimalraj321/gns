export interface NavItem {
  label: string;
  href: string;
}

export interface CountdownTimer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ICOStats {
  usdtRaised: number;
  listingDate: string;
  holders: number;
  tokenPrice: number;
  tokensSold: number;
  nextPhaseIncrease: number;
}