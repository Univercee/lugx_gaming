'use client'

import { BreadcrumbsBanner } from "@/components/breadcrumbs-banner";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function LoginPage() {
    const user = useCurrentUser();
    return (
        <div className="min-h-screen flex flex-col">
        <Header Banner={<BreadcrumbsBanner title="Dashboard"></BreadcrumbsBanner>}></Header>
            <main className="grow">
                Dashbord
            </main>
        <Footer></Footer>
        </div>
    )
}
