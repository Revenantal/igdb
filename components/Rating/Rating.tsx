import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

export interface RatingProps {
    score: number;
    review_count?: number
}

function starSize(score: number) {

    if (score > 1.75) {
        return <FontAwesomeIcon icon={faStar} />;
    }

    if (score > 0.75) {
        return <FontAwesomeIcon icon={faStarHalf} />
    }

    return null;
}

function renderStars(score: number) {
    return Array(5).fill(score).map((x, i) => {
        return starSize(x - i * 2);
    })
}


export default async function Rating({ score, review_count = 0 }: RatingProps) {
    return (
        <div className="rating w-52 relative h-16">
            <div className="rounded bg-slate-800 p-2 px-5 relative w-40">
                <div className="relative">
                    <div className="relative flex items-center gap-1 text-slate-950 w-32">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                    <div className="absolute top-0 flex  items-center gap-1 text-yellow-500 w-32">
                        { renderStars(score / 10) }
                    </div>
                </div>       
            </div>
            <div className="w-32 text-xs text-center ms-2 mt-1 text-slate-600">
                {review_count} reviews
            </div>
            <div className="rounded-full bg-blue-800 h-[2.5em] w-[2.5em] flex justify-center items-center font-bold text-2xl absolute -top-3  right-0">
                { (score / 10).toFixed(1) }
            </div>
 
        </div>
    )
}