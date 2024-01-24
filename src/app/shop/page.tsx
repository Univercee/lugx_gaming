'use client';
import { BreadcrumbsBanner } from "@/components/breadcrumbs-banner";
import ProductCard from "@/components/product-card";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { categories, games } from "@/lib/placeholderdata";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const title = "Our shop";
    const searchCategory = searchParams.get("category");
    const filteredGames = games.filter((game)=>{
      if(searchCategory) return game.genres.includes(searchCategory);
      else return true;
    })
    
    function updateUrl(category: string){
      const params = new URLSearchParams(searchParams);
      if(params.get("category")==category){
        params.delete("category");
      }
      else{
        params.set("category", category);
      }
      router.push(`${pathname}?${params.toString()}`, {scroll: false})
    }
    
    return (
      <div className="min-h-screen flex flex-col gap-10">
        <Header Banner={<BreadcrumbsBanner title={title}/>}></Header>
        <div className="grow wrapper my-16">
          <main className="flex flex-col justify-center items-center gap-32">
            <ul className="flex gap-8">
              {categories.map((category)=>(
                <li onClick={()=>{updateUrl(category.name)}} key={category.name} className={`button-switcher ${category.name==searchCategory?'active':''}`}>{category.name}</li>
              ))}
            </ul>
            <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
              {filteredGames.map(game=>(
                <ProductCard data={game}></ProductCard>
              ))}
            </div>
          </main>
        </div>
        <Footer></Footer>
      </div>
    );
  }
  