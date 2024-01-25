import { BreadcrumbsBanner } from "@/components/breadcrumbs-banner";
import ProductTable from "@/components/product-table";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { Game } from "@/lib/definitions";
import { games } from "@/lib/placeholderdata";
import { Suspense } from "react";

export const dynamic = 'force-static'

export default async function Page({ searchParams }: {
  searchParams?: {
      category?: string,
  };
}) {
    const title = "Our shop";
    const filteredGames = await (new Promise<Game[]>((resolve, reject)=>{
      let data = games.filter((game)=>{
        if(searchParams?.category) return game.genres.includes(searchParams.category);
        else return true;
      });
      resolve(data);
    }));
    
    return (
        <div className="min-h-screen flex flex-col gap-10">
          <Header Banner={<BreadcrumbsBanner title={title}/>}></Header>
          <div className="grow wrapper my-16">
            <Suspense>
              <ProductTable games={filteredGames}></ProductTable>
            </Suspense>
          </div>
          <Footer></Footer>
        </div>
    );
  }
  