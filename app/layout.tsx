import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kerlos G. — Senior Full Stack Architect · Next.js · SaaS · AI",
  description:
    "I build high-performance, scalable applications — from FinTech APIs to AI-integrated SaaS platforms. Top Rated Plus on Upwork · 100% Job Success · 5.0★",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
