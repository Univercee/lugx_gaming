import { ProductFilter } from "@/components/product-filter";
import Footer from "@/components/layout/footer";
import { getGenres } from "@/data/genre";
import { getTags } from "@/data/tag";
import BreadcrumbsHeader from "@/components/layout/breadcrumbs-header";

export default async function Page(
  { searchParams }: {
  searchParams?: {
      genre?: string,
      tag?: string
  };})
{
  const genres = await getGenres();
  const tags = await getTags();
  const title = "Our shop";
  return (
    <main>
      <BreadcrumbsHeader title={title}></BreadcrumbsHeader>
      <div className="grow wrapper">
        <div className="my-16 max-md:px-0">
          <ProductFilter genres={genres} tags={tags}></ProductFilter>
        </div>
      </div>
      <Footer></Footer>
    </main>
  );
}
  