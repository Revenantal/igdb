'use client';


// TODO: Add support for multi select filters?

import Search from './search';
import FilterMenu from './filter/filterMenu';
import FilterTags from './filter/filterTags';
import Filter, { ActiveFilter } from '@/interfaces/gameFilters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';


export default function SearchAndFilter({
    filters
}: {
    filters: Filter[];
}) {

    const router = useRouter();
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const getURLParams = (): ActiveFilter[] => {

        const params = new URLSearchParams(searchParams);
        const activeFilters: ActiveFilter[] = [];

        filters.forEach(filter => {
            const value = params.get(filter.name);
            if (value) {
                activeFilters.push({ filter, value });
            }
        });

        return activeFilters;
    }
    const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>(getURLParams());
    const [filtersMenuOpen, setFiltersMenuOpen] = useState(false);


    const handleFilterChange = (name: string, value: string) => {
        if (!value) {
            setActiveFilters(activeFilters.filter(f => f.filter.name !== name));
            updateURL(name, value);
            return;
        }

        if (activeFilters.find(f => f.filter.name === name)) {
            setActiveFilters(activeFilters.map(f => f.filter.name === name ? { value, filter: filters.find(filter => filter.name === name)! } : f));
            updateURL(name, value);
            return;
        }

        setActiveFilters([...activeFilters, { value, filter: filters.find(filter => filter.name === name)! }]);
        updateURL(name, value);

    };

    const updateURL = (name: string, value: string)=> {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }

        replace(`${pathname}?${params.toString()}`);
        router.refresh();
    };


    return (
        <>

            <div className="backdrop-filter bg-slate-900 backdrop-blur-md backdrop-brightness-50 bg-opacity-70 p-3 px-10 rounded">
                <div className="flex flex-col">

                    <div className="flex flex-row gap-5">
                        <div className="w-2/3">
                            <Search placeholder="Search for a Game!" />
                        </div>

                        <div className="w-1/3 flex">     
                            <button className="rounded bg-slate-900 p-4 text-sm grow text-start hover:bg-blue-900 transition" 
                                onClick={() => 
                                    setFiltersMenuOpen(!filtersMenuOpen)
                                }>
                                <FontAwesomeIcon icon={faFilter} className="me-2" /> Filters 
                                { activeFilters.length > 0 && (
                                    <span className="ms-1 text-xs opacity-50">({activeFilters.length})</span>
                                )}
                            </button>
                            
                        </div>
                    </div>

                    { activeFilters.length > 0 && (
                        <div className="mt-2">
                            <FilterTags filters={activeFilters} onFilterChange={handleFilterChange} />
                        </div> 
                    )}

                </div>

            </div>

            <div className="relative mt-3">
                <div className="absolute w-full">
                    <FilterMenu filters={filters} onFilterChange={handleFilterChange} activeFilters={activeFilters} isOpen={filtersMenuOpen} />
                </div>
            </div>

        </>


    )
}