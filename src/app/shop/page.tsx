import { BreadcrumbsBanner } from "@/components/breadcrumbs-banner";
import { ProductFilter } from "@/components/product-filter";
import { ProductTable } from "@/components/product-table";
import { ProductTableSkeleton } from "@/components/skeletons/product-table-skeleton";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { getGenreByName, getGenres, getTagByName, getTags } from "@/lib/data";
import { Suspense } from "react";

export default async function Page(
  { searchParams }: {
  searchParams?: {
      genre?: string,
      tag?: string
  };})
{
  const genres = await getGenres();
  const tags = await getTags();
  const genre = searchParams?.genre||null;
  const tag = searchParams?.tag||null;
  const title = "Our shop";
  return (
      <div className="min-h-screen flex flex-col gap-10">
        <Header Banner={<BreadcrumbsBanner title={title}/>}></Header>
        <div className="grow wrapper my-16 max-md:px-0">
          <div className="flex flex-col justify-center items-center gap-32 overflow-hidden">
          <Suspense>
            <ProductFilter genres={genres} tags={tags}></ProductFilter>
          </Suspense>
          <Suspense fallback={<ProductTableSkeleton/>}>
            <ProductTable params={{genre, tag}}></ProductTable>
          </Suspense>
          </div>
        </div>
        <Footer></Footer>
      </div>
  );
}
  