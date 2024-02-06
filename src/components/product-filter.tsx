'use client'
import { Genre, Tag } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import { ProductTable } from "./product-table";
import { useEffect, useState } from "react";
import { getFilteredGames } from "@/data/game";
import { GameWithRelations } from "@/lib/definitions";

export function ProductFilter({genres, tags}: {
    genres: Genre[],
    tags: Tag[]
}){
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchGenre = searchParams.get("genre");
    const searchTag = searchParams.get("tag");
    const [games, setGames] = useState([] as GameWithRelations[]);
    const [status, setStatus] = useState("loading" as "loading"|"loaded"|"error");

    const updateUrlGenre = useDebouncedCallback((genre: string)=>{
        const params = new URLSearchParams(searchParams);
        if(params.get("genre")==genre){
          params.delete("genre");
        }
        else{
          params.set("genre", genre);
        }
        window.history.replaceState(null, '', `${pathname}?${params.toString()}`)
    }, 300)

    const updateUrlTag = useDebouncedCallback((tag: string)=>{
        const params = new URLSearchParams(searchParams);
        if(params.get("tag")==tag){
          params.delete("tag");
        }
        else{
          params.set("tag", tag);
        }
        window.history.replaceState(null, '', `${pathname}?${params.toString()}`)
    }, 300)

    const isDisabled = ()=>{
        return status === "loading";
    }

    useEffect(()=>{
        setStatus("loading");
        const genre = searchParams.get("genre");
        const tag = searchParams.get("tag");
        getFilteredGames({genre, tag})
            .then((data)=>{
                setGames(data)
                setStatus("loaded");
            })
            .catch(()=>{
                setStatus("error");
            })
    }, [searchParams])

    return (
        <div className="flex flex-col justify-center items-center gap-32 overflow-hidden">
            <div className="flex flex-col gap-4 md:items-center w-full max-w-full">
                <div className="flex gap-8 max-md:overflow-scroll max-md:px-4 max-md:left-0 pb-4 max-w-full md:border-b-2 text-nowrap">
                    {genres.map((genre)=>(
                        <button
                            disabled={isDisabled()}
                            onClick={()=>{updateUrlGenre(genre.name)}}
                            key={genre.name}
                            className={`button-switcher ${genre.name==searchGenre?'active':''} ${isDisabled()?'disabled':''}`}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
                <div className="flex gap-8 max-md:overflow-scroll max-md:px-4 max-md:left-0 pb-2 max-w-full text-nowrap">
                    {tags.map((tag)=>(
                        <button
                            disabled={isDisabled()}
                            onClick={()=>{updateUrlTag(tag.name)}}
                            key={tag.name}
                            className={`button-switcher ${tag.name==searchTag?'active':''} ${isDisabled()?'disabled':''}`}
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            </div>
            <ProductTable games={games} status={status}></ProductTable>
        </div>
    )
}