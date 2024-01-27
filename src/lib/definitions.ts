export type GameRaw = {
    id: string,
    name: string,
    description: string,
    price: number,
    sale: number|null,
    imageSrc: string,
}

export type Game = {
    id: string,
    name: string,
    description: string,
    price: number,
    sale: number|null,
    genres: Genre[],
    imageSrc: string,
    tags: Tag[]
}

export type Genre = {
    id: string,
    name: string,
    tags: Tag[]
    imageSrc: string
}

export type Tag = {
    id: string,
    name: string
}

export type FilterParams = {
    tag: Tag|null,
    genre: Genre|null
}