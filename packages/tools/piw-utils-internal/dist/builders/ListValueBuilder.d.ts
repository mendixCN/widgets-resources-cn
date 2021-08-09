import { ListValue, ObjectItem } from "mendix";
export declare function ListValueBuilder(): {
    withItems(items: ObjectItem[]): ListValue;
    withAmountOfItems(amount: number): ListValue;
    isLoading(): ListValue;
    isUnavailable(): ListValue;
    simple(): ListValue;
};
