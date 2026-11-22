import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CAHEZ AI Workforce",
  description: "Your intelligent workforce, under your direction."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
