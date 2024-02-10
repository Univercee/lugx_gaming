"use client"
import { deleteGame } from "@/lib/actions/game";
import { GameWithRelations } from "@/lib/definitions";
import Link from "next/link";
import { useFormState } from "react-dom";
import { MessageError } from "../card/message-error";
import { MessageSuccess } from "../card/message-success";
import { UpdateIsActivrForm } from "./is-active-form";

export function ProductsByUser({games}: {games: GameWithRelations[]}){
    const initialState = { message: "", errors: {}};
    const [state, dispatch] = useFormState(deleteGame, initialState);
    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <Link href="./games/create">Create</Link>
                <Link href="./games/edit">Edit</Link>
                <div>
                    <MessageError message={state.error}></MessageError>
                    <MessageSuccess message={state.message}></MessageSuccess>
                </div>
            </div>
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
                        <td className="text-center">{game.status}</td>
                        <td className="text-center">
                            <UpdateIsActivrForm __isActive={game.isActive} id={game.id}></UpdateIsActivrForm>
                        </td>
                        <td className="text-center">
                            <Link href={`./games/${game.id}/edit`} className="button-success">Edit</Link>
                        </td>
                        <td className="text-center">
                            <form action={dispatch}>
                                <input type="text" hidden name="id" id="id" defaultValue={game.id} />
                                <button className="button-accented" type="submit">Delete</button>
                            </form>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}