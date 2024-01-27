import { Game } from "@/lib/definitions";
import Link from "next/link";

export default function ProductCardMostPlayed({data}: {data: Game}) {
    return (
      <Link href={{pathname: `shop/${data.id}`}} className="animated product-card bg-white rounded-3xl relative cursor-pointer flex flex-col items-center">
        <img src={data.imageSrc} alt="Game image" className="rounded-3xl w-full aspect-square" />
        <div className="p-8 text-center">
            <p className="text-slate-500">{data.genres.map((genre=>(genre.name))).join(" | ")}</p>
            <p className="product-card-title font-semibold text-lg">{data.name}</p>
        </div>
        <button className="product-card-button button-accented absolute" style={{bottom: "-25px"}}>Explore</button>
      </Link>
    );
}
  