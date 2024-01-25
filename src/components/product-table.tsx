import ProductCard from "@/components/product-card";
import { Game } from "@/lib/definitions";
import ProductFilter from "./product-filter";

export default function ProductTable({games}:{
    games: Game[]
}) {
    return (
        <div className="flex flex-col justify-center items-center gap-32">
            <ProductFilter></ProductFilter>
            <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                {games.map(game=>(
                <ProductCard data={game}></ProductCard>
                ))}
            </div>
        </div>
    );
  }
  