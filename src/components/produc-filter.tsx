'use client'
import { Genre, Tag } from "@/lib/definitions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ProductFilter({genres, tags}: {
    genres: Genre[],
    tags: Tag[]
}){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchGenre = searchParams.get("genre");
    const searchTag = searchParams.get("tag");

    function updateUrlGenre(genre: string){
        const params = new URLSearchParams(searchParams);
        if(params.get("genre")==genre){
          params.delete("genre");
        }
        else{
          params.set("genre", genre);
        }
        router.push(`${pathname}?${params.toString()}`, {scroll: false})
    }
    function updateUrlTag(tag: string){
        const params = new URLSearchParams(searchParams);
        if(params.get("tag")==tag){
          params.delete("tag");
        }
        else{
          params.set("tag", tag);
        }
        router.push(`${pathname}?${params.toString()}`, {scroll: false})
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            <ul className="flex gap-8 max-md:overflow-scroll max-md:left-0 pb-4 max-w-full border-b-2">
                {genres.map((genre)=>(
                    <li onClick={()=>{updateUrlGenre(genre.name)}} key={genre.name} className={`button-switcher ${genre.name==searchGenre?'active':''}`}>{genre.name}</li>
                ))}
            </ul>
            <ul className="flex gap-8 max-md:overflow-scroll max-md:left-0 pb-2 max-w-full ">
                {tags.map((tag)=>(
                    <li onClick={()=>{updateUrlTag(tag.name)}} key={tag.name} className={`button-switcher ${tag.name==searchTag?'active':''}`}>{tag.name}</li>
                ))}
            </ul>
        </div>
    )
}