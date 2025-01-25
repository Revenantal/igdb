import Card from "@/components/Card";
import IGDB from "@/lib/IGDB";
import type { Metadata } from 'next';

export const revalidate = 3600;

type Props = {
    params: Promise <{ slug: string }>
}

export async function generateMetadata(
    { params }: Props
  ): Promise<Metadata> {

    const slug = (await params).slug
    const { name } = await IGDB.getGame(slug);

    return {
        title:  name,
    }
}


export default async function GamePage({ params }: Props) {
    const slug = (await params).slug;
    const { name, cover, summary, rating, first_release_date, screenshots, artworks } = await IGDB.getGame(slug);

    return (
        <>

   


            <div className="px-5 py-10 relative">
            { artworks && 
                <div className="absolute inset-0 opacity-30 flex items-center justify-center pointer-events-none -z-10 h-[80vh]">
                    <img src={`https://images.igdb.com/igdb/image/upload/t_1080p/${artworks[0].image_id}.jpg`} alt={name || 'Game Artwork'}  className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 from-10%" />
                </div>

                
            }
                <div className="container mx-auto">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-2 gap-4 grid">
                            <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`} alt={name || 'Game cover'} loading="lazy" className="rounded" />
                        </div>

                        <Card className="col-span-7">
                            <h1 className="text-xl font-bold mb-5">{name}</h1>
                            <p>{summary}</p>
                        </Card>

                        <Card className="col-span-3">
                            <div>{rating}</div>
                            <div>{first_release_date}</div>
                        </Card>

                        <Card className="col-span-12 grid grid-cols-5 gap-4">
                            {screenshots && screenshots.map((screenshot) => {
                                return <img key={screenshot.id} src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${screenshot.image_id}.jpg`} alt="" loading="lazy" className="rounded" />
                            })}
                        </Card>

                        <Card className="col-span-12 grid grid-cols-5 gap-4 pb-96">
                            {artworks && artworks.map((artwork) => {
                                return <img key={artwork.id} src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${artwork.image_id}.jpg`} alt="" loading="lazy" className="rounded" />
                            })}
                        </Card>
                    </div>
                </div>
            </div>
        </>
   
    )
}