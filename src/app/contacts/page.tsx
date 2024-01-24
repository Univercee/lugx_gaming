import { BreadcrumbsBanner } from "@/components/breadcrumbs-banner";
import Footer from "@/layout/footer";
import Header from "@/layout/header";


export default function Page() {
    return (
      <div className="min-h-screen flex flex-col">
        <Header Banner={<BreadcrumbsBanner title="Contacts"/>}></Header>
        <div className="grow">
          <main className="flex flex-col justify-center items-center gap-32">
            <p>Contacts page</p>
          </main>
        </div>
        <Footer></Footer>
      </div>
    );
  }
  