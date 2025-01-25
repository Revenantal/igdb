'use client';

import Filter, { ActiveFilter } from '@/interfaces/gameFilters';
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function FilterTags({
    filters,
    onFilterChange
} : {
    filters: ActiveFilter[],
    onFilterChange: (name: string, value: string) => void;
}) {


    const getFilterValueLabel = (filter: Filter, value: string) => {
        const filterValue = filter.values.find(v => v.value == value);
        return filterValue ? filterValue.label : '';
    }


    return (
        <AnimatePresence>
            <div className="flex flex-row gap-1 justify-center">
                {filters.map(({value, filter}) => (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        key={filter.key}
                    >
                        <div key={filter.key} className="text-xs bg-blue-900 p-1 px-3 rounded flex items-center">
                            <button onClick={() => {
                                onFilterChange(filter.name, '');
                            }}><FontAwesomeIcon icon={faXmark} className="text-base me-1 hover:text-blue-300 transition" /></button> 
                            {filter.label} is {getFilterValueLabel(filter, value)}
                        </div>
                    </motion.div>
                ))}
            </div>
        </AnimatePresence>
    )
}