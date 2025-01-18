import Link from 'next/link';
import Image from 'next/image';
import type { ComponentPropsWithoutRef } from "react";

export interface GameCardProps extends ComponentPropsWithoutRef<"input"> {
    id: string;
    name: string;
    slug: number;
    rating: number;
    first_release_date: number;
    cover: {
        id: string;
        image_id: string;
    }
}

function getReleaseDate(first_release_date: number) {
    const date = new Date(first_release_date * 1000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}


export default async function GameCard({ id, name, slug, cover, rating, first_release_date }: GameCardProps) {
    return (
        <Link 
            href={`/game/${slug}`} 
            key={id} 
            className="transition rounded-md bg-slate-900 p-4 text-white hover:scale-105 hover:rotate-1"
        >
            {cover && cover.image_id && (
                <Image className="mx-auto rounded" src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`} alt={name || 'Game cover'} width={264} height={374} />
            )}
            <div className="text-center my-4">
                <h5 className="text-xl">{name}</h5>
                <div className="text-sm">Rating: {Math.round(rating)}</div>
                <div className="text-sm">{getReleaseDate(first_release_date)}</div>
            </div>
            
        </Link>
    )
}