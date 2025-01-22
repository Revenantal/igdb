import IGDB from "@/lib/IGDB";
import Search from "@/components/search";
import Catalog from "@/components/catalog/catalog";
import Pagination from "@/components/catalog/pagination";
import { Suspense } from "react";

export const metadata = {
  title: 'Catalog',
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalItems = await IGDB.getGameCount(query);

  return (

    <div className="px-5 py-10">
      <div className="container mx-auto">

        <div className="mb-5">
          <Search placeholder="Search for a Game!" />
        </div>
        
        <div className="mb-10">
          <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
            <Catalog query={query} currentPage={currentPage} />
          </Suspense>
        </div>

        <div className="mb-5 flex w-full justify-center">
          <Pagination totalItems={totalItems} />
        </div>

      </div>
    </div>
  );
}
