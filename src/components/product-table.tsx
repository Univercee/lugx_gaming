import ProductCard from "./product-card";
import { GameWithRelations} from "@/lib/definitions";


export function ProductTable({games, status}: {
    games: GameWithRelations[],
    status: string
}){
    
    return (
        <>
            {status === "loading" && <div>
                Loading...
            </div>}
            {status === "loaded" && <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                {games.map(game=>(
                    <ProductCard key={game.id} data={game}></ProductCard>
                ))}
            </div>}
            {status === "error" && <div>
                Some error occured
            </div>}
        </>
    )
}