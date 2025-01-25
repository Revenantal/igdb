import GameCard from "@/components/GameCard/GameCard";
import Game from "@/interfaces/game";

export default async function Catalog({
    games,
}: {
    games: Game[];
}) {

    return (
        <div className="flex flex-wrap gap-3 justify-center">
            {games.length > 0 ? (
                games?.map((game: Game) => {
                    return <GameCard key={game.id} {...game} />;
                })
            ): (
                <div className="text-center text-2xl text-slate-500 w-full mt-10">
                    No games found!
                </div>
            )}

        </div>
    )
}