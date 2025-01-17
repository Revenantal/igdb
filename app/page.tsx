import GameCard from "@/components/GameCard/GameCard";

async function getGames() {
  const response = await fetch(
    "https://api.igdb.com/v4/games",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'wq7hizkfqjksc657idbj0gfwwh1rnd',
        'Authorization': 'Bearer hdmntpf3xvrh72boqk95e30l39ov1e',
      },
      body: "fields name,slug,cover.image_id,rating,first_release_date; sort rating desc; where rating != null; limit 30;"
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}


export default async function Home() {

  const games = await getGames();

  return (
    <div className="container mx-auto grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-10 px-5">
      {games?.map((game) => {
        return <GameCard key={game.id} {...game} />;
      })}

    </div>
  );
}
