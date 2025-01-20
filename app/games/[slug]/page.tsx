export const revalidate = 3600;

import Image from "next/image";
import Card from "@/components/Card";
import Rating from "@/components/Rating/Rating";

type Params = Promise<{ slug: string }>

async function getGame(slug: string) {
    const response = await fetch(
        "https://api.igdb.com/v4/games",{ 
            method: 'POST',
            next: { revalidate: 3600 },
            cache: 'default',
            headers: {
            'Accept': 'application/json',
            'Client-ID': 'wq7hizkfqjksc657idbj0gfwwh1rnd',
            'Authorization': 'Bearer hdmntpf3xvrh72boqk95e30l39ov1e',
          },
          body: `fields *, screenshots.image_id, screenshots.id, name, rating, first_release_date, cover.image_id; sort rating desc; where slug = "${slug}"; limit 1;`
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      //console.log(data[0])
      return data[0]
}


export default async function GamePage(props: { params: Params }) {

    const params = await props.params;
    const game = await getGame(params.slug);

    return (
        <div className="px-5 py-10">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-2 gap-4 grid">
                        <Image src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} alt={game.name || 'Game cover'} width={264} height={374} className="rounded" />
                    </div>

                    <Card className="col-span-7">
                        <h1 className="text-xl font-bold mb-5">{game.name}</h1>
                        <p>{game.summary}</p>
                    </Card>

                    <Card className="col-span-3">
                        <Rating score={game.rating} review_count={game.rating_count} />
                        <div className="text-sm">{game.first_release_date}</div>
                    </Card>

                    <Card className="col-span-12 grid grid-cols-5 gap-4">
                        {game.screenshots && game.screenshots.map((screenshot: {image_id: number, id: number}) => {
                            return <Image key={screenshot.id} src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${screenshot.image_id}.jpg`} alt="" width={264} height={374} className="rounded" />
                        })}
                    </Card>
            

                </div>
            </div>
        </div>

        
    )
}