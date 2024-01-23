import { Category } from "@/lib/definitions";
import Image from "next/image";

export default function CategoryCard({data}: {data: Category}) {
    return (
      <div className="feature-card bg-primary rounded-3xl flex flex-col justify-center items-center gap-5">
        <p className="text-white text-lg px-5 pt-5 font-bold text-center text-nowrap">{data.name}</p>
        <img src={data.imageSrc} className="w-full aspect-square rounded-3xl" alt="Feature icon"/>
      </div>
    );
}
  