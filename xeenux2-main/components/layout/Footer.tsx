"use client";

import Link from "next/link";

import Image from "next/image";
import TelegramIcon from "@/public/images/telegram.svg";
import XIcon from "@/public/images/x.svg";
// import YoutubeIcon from "@/public/images/youtube.svg";

const FOOTER_LINKS = {
  Socials: [
    {
      label: "X",
      href: "https://x.com/xeenuxinfo?t=eYwfJYDsNOxdjbhqzvKX-A&s=09",
      icon: XIcon,
    },
    {
      label: "Telegram Channel",
      href: "https://t.me/xeenux",
      icon: TelegramIcon,
    },
    {
      label: "Telegram Chat",
      href: "https://t.me/xeenux",
      icon: TelegramIcon,
    },
    {
      label: "Youtube",
      href: "https://youtube.com/@xeenux-xee?si=Rrj9I_ofGCa1uqPp",
      // icon: YoutubeIcon,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/xeenuxinfo?igsh=MWx3amRwMDRibDVvOQ==",
      // icon: YoutubeIcon,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#F0B90B]/20 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Copyright */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/images/xeenux.png"
                alt="xee-logo"
                width={32}
                height={32}
                priority
              />
              <span className="text-xl font-bold">XEENUX</span>
            </Link>
            <p className="text-gray-400 text-sm">
              © 2024 XEENUX Network. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-lg mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#F0B90B] flex items-center gap-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
