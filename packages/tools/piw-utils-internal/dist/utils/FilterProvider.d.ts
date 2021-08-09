import { Context, Dispatch } from "react";
import { ListAttributeValue } from "mendix";
import { FilterCondition } from "mendix/filters";
export declare type FilterValue = {
    type: string;
    value: any;
};
export interface FilterFunction {
    getFilterCondition(): FilterCondition | undefined;
}
export interface FilterContextValue {
    filterDispatcher: Dispatch<FilterFunction>;
    attribute: ListAttributeValue;
    initialFilters: FilterValue[];
}
export declare function getFilterDispatcher(): Context<FilterContextValue> | undefined;
