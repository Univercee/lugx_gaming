'use client'
import { categories, games } from "@/lib/placeholderdata"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./product-card";

export function ProductTable(){

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchCategory = searchParams.get("category");

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

    const filteredGames = games.filter((game)=>{
        if(searchCategory) return game.genres.includes(searchCategory);
        else return true;
    });

    return (
        <div className="flex flex-col justify-center items-center gap-32">
            <ul className="flex gap-8 max-md:overflow-scroll max-md:left-0 pb-2 max-w-full ">
                {categories.map((category)=>(
                    <li onClick={()=>{updateUrl(category.name)}} key={category.name} className={`button-switcher ${category.name==searchCategory?'active':''}`}>{category.name}</li>
                ))}
            </ul>
            <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                {filteredGames.map(game=>(
                <ProductCard key={game.id} data={game}></ProductCard>
                ))}
            </div>
        </div>
    )
}