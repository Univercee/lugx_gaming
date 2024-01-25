import ProductCard from "@/components/product-card";
import { Game } from "@/lib/definitions";
export default function ProductTable({games}:{
    games: Game[]
}) {
    return (
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {games.map(game=>(
            <ProductCard data={game}></ProductCard>
            ))}
        </div>
    );
  }
  