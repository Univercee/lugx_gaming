import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/layout/footer";

const poppins = Poppins({ subsets: ["latin"], weight:['700', '500', '400'] });

export const metadata: Metadata = {
  title: "LUGX Gaming",
  description: "LUGX gaming home page",
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
        <Footer></Footer>
      </body>
    </html>
  );
}
