import { EditForm } from "@/components/dashboard/edit-form";
import { getGameById, getGamesByUserId, getGamesIds } from "@/data/game";
import { getGenres } from "@/data/genre";
import { getTags } from "@/data/tag";
import { Suspense } from "react";

export async function generateStaticParams(){
    const ids = await getGamesIds();
    return ids;
  }

export default async function Page({params}: { params: {id: string}}) {
    const tags = await getTags();
    const genres = await getGenres();
    const game = await getGameById(params.id);
    
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <EditForm tags={tags} genres={genres} game={game!}></EditForm>
        </Suspense>
    )
}
