import { Game } from "@/lib/definitions";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductCard({data}: {data: Game}) {
    return (
      <div className="product-card bg-muted rounded-3xl relative cursor-pointer">
        <img src={data.imageSrc} alt="Game image" className="rounded-3xl w-full" />
        <p className="banner-price">{data.price}$</p>
        <div className="flex justify-between items-center p-8">
            <div>
                <p className="text-slate-500">{data.genres}</p>
                <p className="product-card-title font-semibold text-lg">{data.name}</p>
            </div>
            <div className="bg-accent product-card-icon rounded-full flex items-center justify-center w-9 h-9">
                <FontAwesomeIcon icon={faBagShopping} className="text-white w-1/2" />
            </div>
        </div>
      </div>
    );
}
  