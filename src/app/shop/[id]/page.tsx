'use server'
import { BreadcrumbsBanner } from "@/components/breadcrumbs-banner";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { getGameById } from "@/lib/data";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams(){
  return [
    {id: "5b870e87-b128-4f1f-bf70-e26c51b08bf3"},
    {id: "46ecf095-e261-47fa-9608-a81d39d019ee"},
    {id: "deabcf92-68b1-40ae-b284-331b8698c10d"},
    {id: "41a6ada6-6d01-4609-8047-d68dfb3eacd5"},
    {id: "7437aed6-39b4-4bad-9bbd-cbb66670fe26"},
    {id: "67c73b70-939e-467b-be95-ec1c53eb47d6"},
    {id: "4b53f840-b3b8-4e79-b88b-193e50f666b6"}
  ]
}

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

export default async function Page({params}: { params: {id: string}}) {
  const game = await getGameById(params.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header Banner={<BreadcrumbsBanner title={params.id} currentPageName={game!.name}/>}></Header>
      <div className="grow">
        <main className="wrapper flex flex-col-reverse md:flex-row justify-between items-center gap-32 my-32">
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
                    <Link className="text-primary hover:underline" href={{pathname: "/shop", query: {genre: genre}}}>{genre}</Link>
                  ))}
                </div>
              </div>
              <div className="flex gap-8">
                <p className="text-gray-500">Tags: </p>
                <div className="flex gap-4">
                  {game!.tags.map((tag)=>(
                    <Link className="text-primary hover:underline" href={{pathname: "/shop", query: {tag: tag}}}>{tag}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
}
  