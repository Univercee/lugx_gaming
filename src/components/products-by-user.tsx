
import { getGamesByUserId } from "@/data/game";
import ProductCard from "./product-card";
import { Suspense, useEffect, useState } from "react";
import { GameWithRelations } from "@/lib/definitions";


export async function ProductsByUser({userId}: {userId: string}){
    // const [games, setGames] = useState([] as GameWithRelations[]);
    // useEffect(()=>{
    //     console.log('use effect');
        
    //     getGamesByUserId(userId).then((data)=>{
    //         setGames(data)
    //     })
    // }, []);
    console.log('start loading');
    
    const games = await getGamesByUserId(userId);
    console.log('end loading');
    return (
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {games.map(game=>(
                <ProductCard key={game.id} data={game}></ProductCard>
            ))}
        </div>
    )
}