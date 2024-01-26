import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const poppins = Poppins({ subsets: ["latin"], weight:['700', '500', '400'] });

export const metadata: Metadata = {
  title: "LUGX Gaming | Contacts",
  description: "LUGX gaming contacts page"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-5W9M0VHPVV"></GoogleAnalytics>
    </html>
  );
}