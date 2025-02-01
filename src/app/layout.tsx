import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Record and monitor your finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh grid grid-rows-[40px_1fr] grid-cols-[40px_1fr]`}
      >
        <nav className="h-10 bg-green-300 col-span-2">App</nav>
        <nav className="w-10 bg-orange-300">Side</nav>
        <main className="py-4 px-4 bg-slate-200 ">{children}</main>
      </body>
    </html>
  );
}
