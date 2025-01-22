import GameCard from "@/components/GameCard/GameCard";
import Game from "@/interfaces/game";
import IGDB from "@/lib/IGDB";

export default async function Catalog({
    query,
    currentPage
}: {
    query?: string;
    currentPage?: number;
}) {

    const games = await IGDB.getGames(query, currentPage);

    return (
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {games?.map((game: Game) => {
                return <GameCard key={game.id} {...game} />;
            })}
        </div>
    )
}