import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme/theme-provider";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { SkipLinks } from "@/components/common/skip-links";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TeleProperty - Ethiopia's #1 Property Platform",
  description: "Buy, sell, and rent properties in Ethiopia. Find apartments, houses, land, and commercial properties across Addis Ababa and Ethiopia.",
  keywords: "Ethiopia property, real estate, apartments, houses, land, commercial property, Addis Ababa",
  openGraph: {
    title: "TeleProperty - Ethiopia's #1 Property Platform",
    description: "Buy, sell, and rent properties in Ethiopia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SkipLinks />
          <I18nProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
