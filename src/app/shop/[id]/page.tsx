import { BreadcrumbsBanner } from "@/components/breadcrumbs-banner";
import Footer from "@/layout/footer";
import Header from "@/layout/header";

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
    return (
      <div className="min-h-screen flex flex-col">
        <Header Banner={<BreadcrumbsBanner title={params.id}/>}></Header>
        <div className="grow">
          <main className="flex flex-col justify-center items-center gap-32">
            <p>{params.id} page</p>
          </main>
        </div>
        <Footer></Footer>
      </div>
    );
  }
  