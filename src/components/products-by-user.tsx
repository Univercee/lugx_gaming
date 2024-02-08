import { GameWithRelations } from "@/lib/definitions";

export function ProductsByUser({games}: {games: GameWithRelations[]}){

    return (
        <table className="border dashboard-products">
            <thead>
                <tr>
                    <th className="text-start">Name</th>
                    <th className="text-start">Price</th>
                    <th className="text-start">Status</th>
                    <th className="text-start">Active</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {games.map((game)=>(
                    <tr key={game.id}>
                        <td>{game.name}</td>
                        <td className="text-center">{game.price}$</td>
                        <td className="text-center">{game.status.name}</td>
                        <td className="text-center"><input type="checkbox" defaultChecked={game.isActive}/></td>
                        <td className="text-start">Edit</td>
                        <td className="text-start">Delete</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}