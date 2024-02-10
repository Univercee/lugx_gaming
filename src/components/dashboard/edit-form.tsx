'use client'
import { useFormState } from "react-dom";
import { CardWrapper } from "../card/card-wrapper";
import { MessageSuccess } from "../card/message-success";
import { MessageError } from "../card/message-error";
import LoaderWrapper from "../card/loader-wrapper";
import { updateGame } from "@/lib/actions/game";
import { Genre, Tag } from "@prisma/client";
import { GameWithRelations } from "@/lib/definitions";

export function EditForm({genres, tags, game}:{
    genres: Genre[],
    tags: Tag[],
    game: GameWithRelations
}){
    const initialState = { message: ""};
    const [state, dispatch] = useFormState(updateGame, initialState);
    
    return (
        <CardWrapper>
            <form action={dispatch} className="flex flex-col items-center gap-6">
                <input type="text" name="id" defaultValue={game.id} hidden />
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-xl" htmlFor="name">Name</label>
                        <input className="border rounded-xl p-3" defaultValue={game.name} id="name" type="name" name='name' aria-describedby='name-error'/>
                    </div>
                    {state.errors?.name &&
                    <div className={`p-2 form-error`} id="name-error" aria-live="polite" aria-atomic="true">
                        {state.errors.name.map((error: string) => (
                            <p className="mt-2 text-sm text-accent" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>}
                </div>
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-xl" htmlFor="price">Price</label>
                        <input className="border rounded-xl p-3" defaultValue={game.price} id="price" type="number" name='price' aria-describedby='price-error'/>
                    </div>
                    {state.errors?.price &&
                    <div className="p-2" id="price-error" aria-live="polite" aria-atomic="true">
                        {state.errors.price.map((error: string) => (
                            <p className="mt-2 text-sm text-accent" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>}
                </div>
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-xl" htmlFor="description">Description</label>
                        <textarea className="border rounded-xl p-3" defaultValue={game.description} id="description" name='description' aria-describedby='description-error'/>
                    </div>
                    {state.errors?.description &&
                    <div className="p-2" id="description-error" aria-live="polite" aria-atomic="true">
                        {state.errors.description.map((error: string) => (
                            <p className="mt-2 text-sm text-accent" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>}
                </div>
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-xl" htmlFor="image">Image</label>
                        <input className="border rounded-xl p-3" id="image" type="file" name='image' aria-describedby='image-error'/>
                    </div>
                    {state.errors?.image &&
                    <div className="p-2" id="image-error" aria-live="polite" aria-atomic="true">
                        {state.errors.image.map((error: string) => (
                            <p className="mt-2 text-sm text-accent" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>}
                </div>
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-xl" htmlFor="genresId">Genres</label>
                        <select multiple defaultValue={game.genres.map(el=>el.id)} className="border rounded-xl p-3" id="genresId" name='genresId' aria-describedby='genresId-error'>
                            {
                                genres.map(genre => (
                                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    {state.errors?.genresId &&
                    <div className="p-2" id="genresId-error" aria-live="polite" aria-atomic="true">
                        {state.errors.genresId.map((error: string) => (
                            <p className="mt-2 text-sm text-accent" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>}
                </div>
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-xl" htmlFor="tagsId">Tags</label>
                        <select multiple defaultValue={game.tags.map(el=>el.id)} className="border rounded-xl p-3" id="tagsId" name='tagsId' aria-describedby='tagsId-error'>
                            {
                                tags.map(tag => (
                                    <option key={tag.id} value={tag.id}>{tag.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    {state.errors?.tagsId &&
                    <div className="p-2" id="tagsId-error" aria-live="polite" aria-atomic="true">
                        {state.errors.tagsId.map((error: string) => (
                            <p className="mt-2 text-sm text-accent" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>}
                </div>
                <MessageSuccess message={state.message}></MessageSuccess>
                <MessageError message={state.error}></MessageError>
                <LoaderWrapper mode="form">
                    <button type="submit" className="button-accented">Submit</button>
                </LoaderWrapper>
            </form>
        </CardWrapper>
    )
}