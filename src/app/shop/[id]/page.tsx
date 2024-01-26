import { BreadcrumbsBanner } from "@/components/breadcrumbs-banner";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { games } from "@/lib/placeholderdata";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export function generateStaticParams(){
  return [
    { id: "tbxgvunvtq"},
    { id: "gotohyzfmp"},
    { id: "sbacqmqrlp"},
    { id: "zaltgaxjyz"},
    { id: "edadyxkwfs"},
    { id: "qgynpxeytc"},
    { id: "hwaadvttmh"},
    { id: "viojboboia"}
  ];
}

export default function Page({params}: { params: {id: string}}) {
  const game = games.filter((game)=>(
    game.id == params.id
  ))[0];
  return (
    <div className="min-h-screen flex flex-col">
      <Header Banner={<BreadcrumbsBanner title={params.id} currentPageName={game.name}/>}></Header>
      <div className="grow">
        <main className="wrapper flex flex-col-reverse md:flex-row justify-center items-center gap-32 my-32">
          <div>
            <Image unoptimized src={game.imageSrc} alt={game.name} className="rounded-3xl aspect-square object-cover" width={2000} height={2000}></Image>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-bold text-2xl">{game.name}</h2>
              <div className="text-primary text-3xl font-bold">{`${game.price}$`}</div>
            </div>
            <p className="text-slate-500">LUGX Gaming Template is based on the latest Bootstrap 5 CSS framework. This template is provided by TemplateMo and it is suitable for your gaming shop ecommerce websites. Feel free to use this for any purpose. Thank you.</p>
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
                <p className="text-primary">{game.genres.join(", ")}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
}
  