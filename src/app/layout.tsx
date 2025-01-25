import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "sonner";
// import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hamza Weather Application",
  description:
    "A weather app built with Next.js using shadcn Charts and OpenWeather API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={"space-y-10 flex-1 w-full h-full"}>
          <Header />
          <div className={"flex-1 w-full p-2"}>{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
