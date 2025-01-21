import Image from "next/image";
import Card from "@/components/Card";
import IGDB from "@/lib/IGDB";

export const revalidate = 3600;

type Params = Promise<{ slug: string }>

export default async function GamePage(props: { params: Params }) {

    const params = await props.params;
    const { name, cover, summary, rating, first_release_date, screenshots } = await IGDB.getGame(params.slug);

    return (
    <div className="px-5 py-10">
        <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2 gap-4 grid">
                    <Image src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`} alt={name || 'Game cover'} width={264} height={374} className="rounded" />
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
                        return <Image key={screenshot.id} src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${screenshot.image_id}.jpg`} alt="" width={264} height={374} className="rounded" />
                    })}
                </Card>
        

            </div>
        </div>
    </div>
    )
}