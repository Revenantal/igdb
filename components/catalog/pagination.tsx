'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import PageLink from './pageLink';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
 
export default function Pagination({ totalItems, perPage = 50}: { totalItems: number, perPage?: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const totalPages = Math.ceil(totalItems / perPage);

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };


    return (
        <>
            <div>
                <div className="flex justify-center items-center space-x-2 mb-4">
                    { currentPage > 1 && <PageLink href={createPageURL(currentPage - 1 )}><FontAwesomeIcon icon={faAngleLeft} /></PageLink> }

                    { currentPage > 3 && <>
                        <PageLink href={createPageURL(1)}>1</PageLink>
                        <div className="text-xl px-3">...</div>
                    </>}

                    { currentPage > 2 && <PageLink href={createPageURL(currentPage - 2 )}>{currentPage - 2}</PageLink> }

                    { currentPage > 1 && <PageLink href={createPageURL(currentPage - 1 )}>{currentPage - 1}</PageLink> }
                    
                    <PageLink>{currentPage}</PageLink>

                    { currentPage < totalPages - 1 && <PageLink href={createPageURL(currentPage + 1 )}>{currentPage + 1}</PageLink> }

                    { currentPage < totalPages - 2 && <PageLink href={createPageURL(currentPage + 2 )}>{currentPage + 2}</PageLink> }

                    { currentPage < totalPages - 3 && <>
                        <div className="text-xl px-3">...</div>
                        <PageLink href={createPageURL(totalPages)}>{totalPages}</PageLink>  
                    </>}

                    { currentPage < totalPages - 1 && <PageLink href={createPageURL(currentPage + 1 )}><FontAwesomeIcon icon={faAngleRight} /></PageLink> }
                </div>

                <div className="text-center text-zinc-500">
                    Showing <span className="text-zinc-200 font-bold">{(currentPage - 1) * perPage + 1}</span> to <span className="text-zinc-200 font-bold">{currentPage * perPage}</span> of <span className="text-zinc-200 font-bold">{totalItems}</span> Games
                </div>

            </div>
            

        </>
    )
}