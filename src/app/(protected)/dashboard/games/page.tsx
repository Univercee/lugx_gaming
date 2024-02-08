'use server'
import { auth } from "@/auth";
import { ProductsByUser } from "@/components/products-by-user";
import { getGamesByUserId } from "@/data/game";

export default async function Page() {
    const session = await auth();
    const games = await getGamesByUserId(session?.user.id);
    return (
        <>
           {session && <ProductsByUser games={games}></ProductsByUser>}
        </>
    )
}
