import { ReactNode } from "react";
import { IconType } from "react-icons";
// import  { BiSolidDashboard } from "react-icons/bi"

export interface NavLiistType {
  path: string;
  name: string;
  image?: string;
  icon?: IconType;
}

export interface IDashboard {
  name: string;
  value: number;
  isMoney: boolean;
  icon?: ReactNode;
}

export const navList: NavLiistType[] = [
  {
    path: "/investments",
    name: "Dashboard",
    image: "/MENU/Investment.png",
  },
  {
    path: "/referral-history",
    name: "Referrals",
    image: "/MENU/Team.png",
  },
  {
    path: "/records",
    name: "Records",
    image: "/MENU/Report.png",
  },
  {
    path: `${import.meta.env.VITE_GAMES_URL}`,
    name: "Game",
    image: "/MENU/GAME.png",
  },
  {
    path: "/swap",
    name: "Swap",
    image: "/MENU/SWAP.png",
  },
];

export const adminSidebar: NavLiistType[] = [
  {
    path: "",
    name: "Dashboard",
    // icon: <BiSolidDashboard />
  },
  {
    path: "users",
    name: "Users",
  },
  {
    path: "requests",
    name: "Withdrawal Requests",
  },
  {
    path: "withrawal-report",
    name: "Withdrawal Report",
  },
  {
    path: "investments",
    name: "Investments",
  },
  {
    path: "support",
    name: "Support",
  },
];

export const dashboardData: IDashboard[] = [
  {
    name: "users",
    value: 11123,
    isMoney: false,
  },
  {
    name: "Number of investments",
    value: 123457,
    isMoney: false,
  },
  {
    name: "Total amount invested",
    value: 123457,
    isMoney: true,
  },
  {
    name: "Total amount withdrawn",
    value: 123457,
    isMoney: true,
  },
];
