import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const notoSansThai = Noto_Sans_Thai({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin", "thai"],
  variable: "--font-noto-sans-thai",
});

import ThemeRegistry from "@theme/ThemeRegistry";

export const metadata: Metadata = {
  title: "Medical Inventory - Management System",
  description: "Modern Medical Inventory Management System Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansThai.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
