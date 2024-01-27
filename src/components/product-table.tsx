import ProductCard from "./product-card";
import { FilterParams} from "@/lib/definitions";
import { getFilteredGames } from "@/lib/data";


export async function ProductTable({params}: {
    params: FilterParams
}){
    
    const filteredGames = await getFilteredGames(params);
    
    return (
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {filteredGames.map(game=>(
                <ProductCard key={game.id} data={game}></ProductCard>
            ))}
        </div>
    )
}