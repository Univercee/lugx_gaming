import { BreadcrumbsBanner } from "@/components/breadcrumbs-banner";
import ProductFilter from "@/components/product-filter";
import ProductTable from "@/components/product-table";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { games } from "@/lib/placeholderdata";
import { Suspense } from "react";

export const dynamic = 'force-static'

export default function Page({ searchParams }: {
  searchParams?: {
      category?: string,
  };
}) {
    const title = "Our shop";
    const filteredGames = games.filter((game)=>{
      if(searchParams?.category) return game.genres.includes(searchParams.category);
      else return true;
    })
    
    return (
        <div className="min-h-screen flex flex-col gap-10">
          <Header Banner={<BreadcrumbsBanner title={title}/>}></Header>
          <div className="grow wrapper my-16">
            <main className="flex flex-col justify-center items-center gap-32">
              <ProductFilter></ProductFilter>
              <Suspense>
                <ProductTable games={filteredGames}></ProductTable>
              </Suspense>
            </main>
          </div>
          <Footer></Footer>
        </div>
    );
  }
  