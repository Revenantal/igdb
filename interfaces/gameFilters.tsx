export default interface Filter {
    key: number;
    filter_key: string;
    name: string;
    label: string;
    type: FilterType;
    values: Value[];
}

export interface Value {
    value: string;
    label: string;
}

export enum FilterType {
    SELECT = "select",
}

export interface ActiveFilter {
    value: string;
    filter: Filter;
}
