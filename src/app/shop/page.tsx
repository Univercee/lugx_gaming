import { BreadcrumbsBanner } from "@/components/breadcrumbs-banner";
import { ProductFilter } from "@/components/product-filter";
import { ProductTable } from "@/components/product-table";
import { ProductTableSkeleton } from "@/components/skeletons/product-table-skeleton";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Suspense } from "react";
import { getGenres } from "@/data/genre";
import { getTags } from "@/data/tag";

export default async function Page(
  { searchParams }: {
  searchParams?: {
      genre?: string,
      tag?: string
  };})
{
  const genres = await getGenres();
  const tags = await getTags();
  const genre = searchParams?.genre;
  const tag = searchParams?.tag;
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
  