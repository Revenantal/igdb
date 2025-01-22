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
        <div className="flex flex-wrap gap-2 justify-center">
            {games?.map((game: Game) => {
                return <GameCard key={game.id} {...game} />;
            })}
        </div>
    )
}