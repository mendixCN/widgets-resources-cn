import { ReactElement } from "react";
interface FilterSelectorProps<T> {
    ariaLabel?: string;
    name?: string;
    defaultFilter: T;
    onChange: (value: T) => void;
    options: Array<{
        value: T;
        label: string;
    }>;
}
export declare function FilterSelector<T>(props: FilterSelectorProps<T>): ReactElement;
export {};
