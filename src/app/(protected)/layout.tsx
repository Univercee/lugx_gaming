import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({ subsets: ["latin"], weight:['700', '500', '400', '300'] });

export const metadata: Metadata = {
  title: "LUGX Gaming",
  description: "LUGX gaming home page",
  other: {
    "google-site-verification": "gIZlVp0xapUwGWFGglFBjSVhHwJi8c99KvvMi4OF7g0"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
      <GoogleAnalytics gaId="G-9N358EQ6TL"></GoogleAnalytics>
    </html>
  );
}
