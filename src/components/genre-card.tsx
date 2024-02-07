import { GenreWithRelations } from "@/lib/definitions";
import Link from "next/link";

export default function GenreCard({data}: {data: GenreWithRelations}) {
    return (
      <Link href={{pathname: "shop", query: {genre: data.name}}} className="feature-card bg-primary rounded-3xl flex flex-col justify-center items-center gap-5">
        <p className="text-white text-lg px-5 pt-5 font-bold text-center text-nowrap">{data.name}</p>
        <img src={data.image} className="w-full aspect-square rounded-3xl" alt="Feature icon"/>
      </Link>
    );
}
  