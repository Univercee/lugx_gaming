import { Game } from "@/lib/definitions";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ProductCard({data}: {data: Game}) {
    return (
      <Link href={`/shop/${data.id}`} className="product-card relative bg-muted rounded-3xl cursor-pointer">
        <div>
          <img src={data.imageSrc} alt="Game image" className="rounded-3xl w-full" />
          <p className="banner-price">{data.price}$</p>
          <div className="flex p-8 mb-5">
              <div className="self-start">
                  <p className="flex text-slate-500">{data.genres.map((genre)=>(<span>{genre}</span>))}</p>
                  <p className="product-card-title font-semibold text-lg">{data.name}</p>
              </div>
          </div>
          <div className="absolute bottom-5 right-5 bg-accent product-card-icon rounded-full flex items-center justify-center min-w-10 w-10 aspect-square">
            <FontAwesomeIcon icon={faBagShopping} className="text-white w-1/2 aspect-square" />
          </div>
        </div>
      </Link>
    );
}
  