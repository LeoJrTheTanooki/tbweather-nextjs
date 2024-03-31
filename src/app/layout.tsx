import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "TBWeather",
  description: "Full Name: ThrowBackWeather. An app that reads the weather on the style of a (somewhat) 8-bit game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pressStart2P.className}>{children}</body>
    </html>
  );
}
