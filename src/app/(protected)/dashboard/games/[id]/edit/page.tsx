'use server'
import { auth } from "@/auth";
import { CreateForm } from "@/components/dashboard/create-form";
import { EditForm } from "@/components/dashboard/edit-form";
import { ProductsByUser } from "@/components/dashboard/products-by-user";
import { getGameById, getGamesByUserId } from "@/data/game";
import { getGenres } from "@/data/genre";
import { getTags } from "@/data/tag";
import { Suspense } from "react";

export default async function Page({searchParams:{ id }}:{
    searchParams: {
        id: string
    }
}) {
    const tags = await getTags();
    const genres = await getGenres();
    const game = await getGameById(id);
    return (
        <Suspense fallback={<p>Loading...</p>}>
            {game && <EditForm tags={tags} genres={genres} game={game}></EditForm>}
        </Suspense>
    )
}
