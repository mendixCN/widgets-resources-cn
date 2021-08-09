import { ListAttributeValue } from "mendix";
import { Big } from "big.js";
export declare class ListAttributeValueBuilder<T extends string | boolean | Date | Big> {
    private readonly listAttribute;
    withId(id: any): ListAttributeValueBuilder<T>;
    withSortable(sortable: boolean): ListAttributeValueBuilder<T>;
    withFilterable(filterable: boolean): ListAttributeValueBuilder<T>;
    withType(type: "AutoNumber" | "Binary" | "Boolean" | "DateTime" | "Decimal" | "Enum" | "EnumSet" | "HashString" | "Integer" | "Long" | "ObjectReference" | "ObjectReferenceSet" | "String"): ListAttributeValueBuilder<T>;
    withFormatter(format: (value?: any) => string, parse: () => any): ListAttributeValueBuilder<T>;
    withUniverse(universe: T[]): ListAttributeValueBuilder<T>;
    build(): ListAttributeValue<T>;
}
