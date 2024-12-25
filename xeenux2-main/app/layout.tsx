import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { PresaleProvider } from "@/providers/provider";
const inter = Inter({ subsets: ["latin"] });
import ContextProvider from "@/context";

export const metadata: Metadata = {
  title: "XEENUX Presale",
  description:
    "Join presale & get profit from Trading Pool in USDT every month.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PresaleProvider>
          <ContextProvider cookies={null}>
            <Navbar />
            {children}
          </ContextProvider>
        </PresaleProvider>
      </body>
    </html>
  );
}
