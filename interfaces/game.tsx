export default interface Game {
    id: string;
    name: string;
    slug: number;
    summary: string;
    rating: number;
    rating_count: number;
    first_release_date: number;
    cover: Image;
    screenshots: Image[];
    artworks: Image[];
}

export interface Image {
    id: number;
    image_id: string;
}
