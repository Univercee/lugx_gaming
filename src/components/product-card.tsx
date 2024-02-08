import { GameWithRelations } from "@/lib/definitions";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Game } from "@prisma/client";
import Link from "next/link";

export default function ProductCard({data}: {data: GameWithRelations}) {
    return (
      <Link href={`/shop/${data.id}`} className="animated product-card relative bg-muted rounded-3xl cursor-pointer">
        <div>
          <img src={data.image} alt="Game image" className="rounded-3xl w-full" />
          <p className="banner-price">{data.price}$</p>
          <div className="flex flex-col jus gap-4 p-8 mb-5">
              {/* <p className="text-accent font-semibold h-4">{data.tags.map<React.ReactNode>(((el,i)=>(
                <span>{el.tag.name}{(i<data.tags.length-1)?<span className="text-slate-500 font-light"> | </span>:""}</span>
              )))}</p> */}
              <div className="self-start">
                <p className="flex text-slate-500">{data.genres.map((genre=>(genre.name))).join(" | ")}</p>
                <p className="product-card-title font-semibold text-lg w-52">{data.name}</p>
              </div>
          </div>
          <div className="absolute bottom-5 right-5 bg-accent product-card-icon rounded-full flex items-center justify-center min-w-10 w-10 aspect-square">
            <FontAwesomeIcon icon={faBagShopping} className="text-white w-1/2 aspect-square" />
          </div>
        </div>
      </Link>
    );
}
  