'use server'
import { auth } from "@/auth";
import { CreateForm } from "@/components/dashboard/create-form";
import { ProductsByUser } from "@/components/dashboard/products-by-user";
import { getGamesByUserId } from "@/data/game";
import { getGenres } from "@/data/genre";
import { getTags } from "@/data/tag";

export default async function Page() {
    const tags = await getTags();
    const genres = await getGenres();
    return (
        <>
           <CreateForm tags={tags} genres={genres}></CreateForm>
        </>
    )
}
