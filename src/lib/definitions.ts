import { Game, Genre, Tag } from "@prisma/client"

export type State = {
    errors?: {
        email?: string[],
        password?: string[],
        name?: string[]
    },
    message?: string | null,
    error?: string | null,
    twoFactor?: boolean
};

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
    tag?: string|null,
    genre?: string|null
}