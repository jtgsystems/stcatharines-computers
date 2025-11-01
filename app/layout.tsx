import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./components/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "St. Catharines Computer Repair | Expert Laptop & PC Service",
  description: "Professional computer repair services in St. Catharines, Niagara. Expert laptop screen replacement, data recovery, and computer diagnostics. Fast, reliable service.",
  keywords: ["computer repair", "laptop repair", "St. Catharines", "Niagara", "screen replacement", "data recovery"],
  authors: [{ name: "JTG Systems" }],
  openGraph: {
    title: "St. Catharines Computer Repair | Expert Service",
    description: "Professional computer and laptop repair in St. Catharines, Niagara region.",
    type: "website",
    locale: "en_CA",
    siteName: "St. Catharines Computers",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
