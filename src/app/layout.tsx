import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ashoka Agencies LLP — Kidswear Trade Mediators",
  description: "Ashoka Agencies LLP is India's trusted intermediary connecting kidswear manufacturers with wholesale buyers. Building lasting trade partnerships across India.",
  openGraph: {
    title: "Ashoka Agencies LLP",
    description: "Your trusted bridge between kidswear manufacturers and wholesalers.",
    siteName: "Ashoka Agencies LLP",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="antialiased min-h-screen bg-green text-white overflow-x-hidden" style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
