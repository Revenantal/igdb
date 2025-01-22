import Link from 'next/link';
import Image from 'next/image';
import Game from '@/interfaces/game';


export default async function GameCard({slug, id, cover, name}: Game) {
    return (
        <Link 
            href={`/games/${slug}`} 
            key={id} 
            className="transition rounded bg-slate-900 text-white hover:scale-105 hover:rotate-1 w-[264px] h-[352px] overflow-hidden relative"
        >
            {cover && cover.image_id && (
                <Image className="mx-auto" src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`} alt={name || 'Game cover'} width={264} height={352} />
            )}

            <div className="p-3 absolute bottom-0 left-0 right-0 backdrop-filter backdrop-blur-md backdrop-brightness-50 mx-auto w-auto">
                <h2 className="font-bold text-center text-sm">{name}</h2>
            </div>

            
        </Link>
    )
}
