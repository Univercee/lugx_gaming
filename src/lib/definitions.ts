import { Game, Genre, Status, Tag, User } from "@prisma/client"

export type GameWithRelations = Game & {
    genres: {
        genre: Genre
    }[],
    tags: {
        tag: Tag
    }[]
}

export type GenreWithRelations = Genre & {
    tags: {
        tag: Tag
    }[]
}


export type FilterParams = {
    tag?: string,
    genre?: string
}