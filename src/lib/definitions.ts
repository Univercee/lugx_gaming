import { Game, Genre, Status, Tag, User } from "@prisma/client"

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
    genres: Genre[],
    tags: Tag[],
    status: Status
}

export type GenreWithRelations = Genre & {
    tags: Tag[]
}


export type FilterParams = {
    tag?: string|null,
    genre?: string|null
}