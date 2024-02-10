import { Game, Genre, Tag, User } from "@prisma/client"

export type State = {
    errors?: {
        [key: string]: any
    },
    message?: string | null,
    error?: string | null,
    
};

export type LoginState = State & {twoFactor?: boolean};

export type GameWithRelations = Game & {
    genres: Genre[],
    tags: Tag[]
}

export type GenreWithRelations = Genre & {
    tags: Tag[]
}


export type FilterParams = {
    tag?: string|null,
    genre?: string|null
}