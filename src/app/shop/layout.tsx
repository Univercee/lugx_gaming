import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";

const poppins = Poppins({ subsets: ["latin"], weight:['700', '500', '400'] });

export const metadata: Metadata = {
  title: "LUGX Gaming",
  description: "LUGX gaming home page",
  other: {
    "google-site-verification": "32SvNvVJunH5bGvezW8GU16IM6lm5qdsW8KoC41hALU"
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
        <Suspense>
            {children}
        </Suspense>
      </body>
      <GoogleAnalytics gaId="G-5W9M0VHPVV"></GoogleAnalytics>
    </html>
  );
}