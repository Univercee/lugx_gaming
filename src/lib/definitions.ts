export type Game = {
    id: string,
    name: string,
    price: number,
    sale: number|null,
    genres: string[],
    imageSrc: string
}

export type Category = {
    name: string,
    imageSrc: string
}