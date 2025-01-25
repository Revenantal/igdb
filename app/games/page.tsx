import IGDB from "@/lib/IGDB";
import Catalog from "@/components/catalog/catalog";
import Pagination from "@/components/catalog/pagination";
import SearchAndFilter from "@/components/searchAndFilter";
import Filter, { FilterType } from "@/interfaces/gameFilters";

export const metadata = {
  title: 'Catalog',
}

export default async function Page(props: {
  searchParams?: Promise<{ [key: string]: string }>;
}) {

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const filterValues = await IGDB.getFilterValues();

  /*
  * Filters for games
  * 1. Rating 
  * 2. Status
  * 3. Release Date
  * 4. Genre
  * 5. Platform
  * 8. Multiplayer Modes
  */
  const filters: Filter[] = [
    {
      key: 1,
      name: "release_date_statuses",
      filter_key: "release_dates.status",
      label: "Status",
      type: FilterType.SELECT,
      values: filterValues.find((filter) => filter.name === 'release_date_statuses')?.result
        .map(x => ({ value: String(x.id), label: x.name })) || [],
    }, {
      key: 2,
      name: "genres",
      filter_key: "genres",
      label: "Genre",
      type: FilterType.SELECT,
      values: filterValues.find((filter) => filter.name === 'genres')?.result
        .map(x => ({ value: String(x.id), label: x.name })) || [],
    }, {
      key: 3,
      name: "platform",
      filter_key: "platforms",
      label: "Platform",
      type: FilterType.SELECT,
      values: filterValues.find((filter) => filter.name === 'platforms')?.result
        .map(x => ({ value: String(x.id), label: x.name })) || [],
    }, {
      key: 4,
      name: "player_perspectives",
      filter_key: "player_perspectives",
      label: "Player Perspective",
      type: FilterType.SELECT,
      values: filterValues.find((filter) => filter.name === 'player_perspectives')?.result
        .map(x => ({ value: String(x.id), label: x.name })) || [],
    }, {
      key: 5,
      name: "game_modes",
      filter_key: "game_modes",
      label: "Game Modes",
      type: FilterType.SELECT,
      values: filterValues.find((filter) => filter.name === 'game_modes')?.result
        .map(x => ({ value: String(x.id), label: x.name })) || [],
    }, {
      key: 7,
      name: "order_by",
      filter_key: "order_by",
      label: "Order By",
      type: FilterType.SELECT,
      values: [
        { value: "hypes", label: "Hype" },
        { value: "rating", label: "Rating" },
        { value: "release_dates.date", label: "Release Date" },
        { value: "name", label: "Name" },
      ]
    }, {
      key: 8,
      name: "order_direction",
      filter_key: "order_direction",
      label: "Order Direction",
      type: FilterType.SELECT,
      values: [
        { value: "asc", label: "Ascending" },
        { value: "desc", label: "Descending" },
      ]
    }
  ];

  const queryParams: { name: string, value: string }[] = [];
  for (const property in searchParams) {
    if (filters.find(x => x.name === property) || property === 'query') {
      queryParams.push({name: filters.find(x => x.name === property)?.filter_key || property, value: searchParams[property]});
    }
  }

  const gameQuery = await IGDB.getGames(queryParams, currentPage-1, 50, IGDB.fields);
  const games = gameQuery.find(x => x.name === 'games')?.result || [];
  const total = gameQuery.find(x => x.name === 'total')?.count || 0;

  return (
    <>
      <div className="px-5 py-10">
        <div className="sticky top-3 left-0 right-0 z-20 mb-5 max-w-xl mx-auto">
          <SearchAndFilter filters={filters} />
        </div>

        <div className="mb-10">
          <Catalog games={games} />
        </div>

        { total > 0 && (
          <div className="sticky bottom-3 left-0 right-0 flex z-10">
            <div className="backdrop-filter bg-slate-900 backdrop-blur-md backdrop-brightness-50 bg-opacity-70 mx-auto w-auto p-3 px-10 rounded">
              <Pagination totalItems={total} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
