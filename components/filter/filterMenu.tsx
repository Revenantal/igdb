'use client';

import Filter, { ActiveFilter, FilterType } from '@/interfaces/gameFilters';
import { motion, AnimatePresence } from "framer-motion"
import Select from '../ui/forms/select';

export default function FilterMenu({
        filters,
        activeFilters,
        onFilterChange,
        isOpen = false,
    }: {
        filters: Filter[];
        activeFilters: ActiveFilter[];
        onFilterChange: (name: string, value: string) => void;
        isOpen: boolean;
    }) {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(e.target.name, e.target.value);
    };

    const getSelectedValue = (name: string) => {
        const activeFilter = activeFilters.find(f => f.filter.name === name);
        return activeFilter ? activeFilter.value : '';
    }
    
    return (
        <>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        style={{ overflow: "hidden" }}
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        transition={{ duration: 0.5 }}
                        exit={{ height: 0 }}
                        key={"filterMenu"}
                    >
                        <div className="backdrop-filter bg-slate-900 backdrop-blur-md backdrop-brightness-50 bg-opacity-70 py-5 px-10 rounded grid grid-cols-2 gap-3 gap-x-5">
                            {filters.map(({key, name, label, values, type}: Filter) => (
                                <div key={key} className="flex flex-col">
                                    <label className="font-bold">{label}</label>

                                    {type === FilterType.SELECT && (
                                        <Select onChange={handleSelectChange} values={values} name={name} value={getSelectedValue(name)}/>
                                    )}
                                </div>
                            ))}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )

}