'use client'
import { useSearchParams } from "next/navigation";
import { ProductTable } from "./product-table";

export function ProductTableWrapper(){
    const searchParams = useSearchParams();
    const genre = searchParams.get("genre");
    const tag = searchParams.get("tag");


    return (
        <div className="flex flex-col gap-4 md:items-center w-full max-w-full">
            <ProductTable params={{genre, tag}}></ProductTable>
        </div>
    )
}