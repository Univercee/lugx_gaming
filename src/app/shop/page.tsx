import { BreadcrumbsBanner } from "@/components/breadcrumbs-banner";
import Footer from "@/layout/footer";
import Header from "@/layout/header";

export function generateStaticParams(){
    return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default function Page({params}: { params: {id: string}}) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header Banner={<BreadcrumbsBanner/>}></Header>
        <div className="grow">
          <main className="flex flex-col justify-center items-center gap-32">
            <p>Shop page</p>
          </main>
        </div>
        <Footer></Footer>
      </div>
    );
  }
  