import IGDB from "@/lib/IGDB";
import GameCard, { GameCardProps } from "@/components/GameCard/GameCard";

export default async function Home() {

  const games = await IGDB.getGames();
  const gameCount = await IGDB.getGameCount();

  return (

    <div className="px-5 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-5">{gameCount} Games and counting!</h1>
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {games?.map((game) => {
            return <GameCard key={game.id} {...game} />;
          })}
        </div>

        <h1 className="text-3xl font-bold my-5">Pagination coming soon. Im slow.</h1>
      </div>
    </div>
  );
}
