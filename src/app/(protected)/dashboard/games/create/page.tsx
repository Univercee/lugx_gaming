import { CreateForm } from "@/components/dashboard/create-form";
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
