import BreadcrumbsHeader from "@/components/layout/breadcrumbs-header";
import { getGameById, getGamesIds } from "@/data/game";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(
  { params }: {params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
 
  // fetch data
  const game = await getGameById(params.id);

  return {
    title: game?.name,
    description: game?.description
  }
}

export async function generateStaticParams(){
  const ids = await getGamesIds();
  return ids;
}

export default async function Page({params}: { params: {id: string}}) {
  const game = await getGameById(params.id);

  return (
    <div>
      <BreadcrumbsHeader title={game!.name} pageName={game!.name}></BreadcrumbsHeader>
      <div className="grow wrapper">
        <div className="my-16 max-md:px-0">
          <main className="flex flex-col-reverse md:flex-row justify-between items-center gap-32 my-32">
            <div className="w-full">
              <Image unoptimized src={game!.image} alt={game!.name} className="rounded-3xl aspect-square object-cover" width={2000} height={2000}></Image>
            </div>
            <div className="flex flex-col gap-8 w-full">
              <div>
                <h2 className="font-bold text-2xl">{game!.name}</h2>
                <div className="text-primary text-3xl font-bold">{`${game!.price}$`}</div>
              </div>
              <p className="text-slate-500">{game!.description}</p>
              <div className="flex gap-4">
                <input className="border w-20 rounded-3xl px-3 text-center" placeholder="1" type="number" defaultValue={1}/>
                <button className="button-accented flex items-center justify-center gap-4">
                  <FontAwesomeIcon icon={faBagShopping} className="text-white aspect-square" />
                  <span className="">Add to cart</span>
                </button>
              </div>
              <div>
                <div className="flex gap-8">
                  <p className="text-gray-500">Genres: </p>
                  <div className="flex gap-4">
                    {game!.genres.map((genre)=>(
                      <Link className="text-primary hover:underline" href={{pathname: "/shop", query: {genre: genre.name}}}>{genre.name}</Link>
                    ))}
                  </div>
                </div>
                <div className="flex gap-8">
                  <p className="text-gray-500">Tags: </p>
                  <div className="flex gap-4">
                    {game!.tags.map((tag)=>(
                      <Link className="text-primary hover:underline" href={{pathname: "/shop", query: {tag: tag.name}}}>{tag.name}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
  