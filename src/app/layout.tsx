import type { Metadata } from "next";
import { Playfair_Display, Lora, Geist_Mono } from "next/font/google";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BookNav } from "@/components/book-nav";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI from the Ground Up",
    template: "%s — AI from the Ground Up",
  },
  description:
    "A course for developers who use AI every day but want to understand what's actually happening.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <div className="book-layout">
          <BookNav />
          <div className="book-main">
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
