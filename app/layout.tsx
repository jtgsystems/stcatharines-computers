import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./components/ThemeRegistry";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

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
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flex: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
