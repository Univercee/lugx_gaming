export type GameRaw = {
    id: string,
    name: string,
    description: string,
    price: number,
    image: string,
}

export type Game = GameRaw & {
    genres: string[],
    tags: string[]
}

export type GenreRaw = {
    id: string,
    name: string,
    image: string
}

export type Genre = GameRaw & {
    tags: string[]
}

export type Tag = {
    id: string,
    name: string
}

export type FilterParams = {
    tag: string|null,
    genre: string|null
}