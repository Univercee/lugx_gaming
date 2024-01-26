import { BreadcrumbsBanner } from "@/components/breadcrumbs-banner";
import { ProductTable } from "@/components/product-table";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { Suspense } from "react";

export default function Page() {
    const title = "Our shop";
    return (
        <div className="min-h-screen flex flex-col gap-10">
          <Header Banner={<BreadcrumbsBanner title={title}/>}></Header>
          <div className="grow wrapper my-16">
            <Suspense>
              <ProductTable></ProductTable>
            </Suspense>
          </div>
          <Footer></Footer>
        </div>
    );
  }
  