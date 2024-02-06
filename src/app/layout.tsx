import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/layout/header";

const poppins = Poppins({ subsets: ["latin"], weight:['700', '500', '400', '300'] });

export const metadata: Metadata = {
  title: "LUGX Gaming",
  description: "LUGX gaming home page",
  other: {
    "google-site-verification": "gIZlVp0xapUwGWFGglFBjSVhHwJi8c99KvvMi4OF7g0"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
      <html lang="en">
        <body>
          <div>
            <div className="min-h-screen flex flex-col gap-10">
              <SessionProvider session={session}>
                {children}
              </SessionProvider>
            </div>
          </div>
          <GoogleAnalytics gaId="G-9N358EQ6TL"></GoogleAnalytics>
        </body>
      </html>
  );
}
