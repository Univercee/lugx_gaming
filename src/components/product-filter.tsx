'use client';
import { categories } from "@/lib/placeholderdata";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function ProductFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

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
    
    return (
        <ul className="flex gap-8">
            {categories.map((category)=>(
                <li onClick={()=>{updateUrl(category.name)}} key={category.name} className={`button-switcher ${category.name==searchCategory?'active':''}`}>{category.name}</li>
            ))}
        </ul>
    );
  }
  