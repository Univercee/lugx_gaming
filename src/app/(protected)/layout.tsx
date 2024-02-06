import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/layout/footer";
import DashboardNav from "@/components/dashboard-nav";
import { auth } from "@/auth";
import BreadcrumbsHeader from "@/components/layout/breadcrumbs-header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
        <BreadcrumbsHeader title="Dashboard"></BreadcrumbsHeader>
        <main className="wrapper grow flex py-12">
          <DashboardNav></DashboardNav>
          {children}
        </main>
      <Footer></Footer>
    </div>
  );
}
