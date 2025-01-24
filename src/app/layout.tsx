import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header
    from "@/components/header";
import React
    from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hamza Weather App",
  description: "A weather app built with Next.js using shadcn Charts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className={"space-y-2"}>
           <Header />
       <div className={"flex-1 p-2"}>
           {children}
       </div>
       </div>
      </body>
    </html>
  );
}
