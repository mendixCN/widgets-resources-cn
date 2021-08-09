import { EditableValue } from "mendix";
import { Big } from "big.js";
export declare enum FormatterType {
    Number = "number",
    DateTime = "datetime"
}
export declare class EditableValueBuilder<T extends string | boolean | Date | Big> {
    private readonly editableValue;
    withValue(value?: T): EditableValueBuilder<T>;
    withFormatter(formatter: EditableValue<T>["formatter"]): EditableValueBuilder<T>;
    isReadOnly(): EditableValueBuilder<T>;
    isLoading(): EditableValueBuilder<T>;
    isUnavailable(): EditableValueBuilder<T>;
    withValidation(validation?: string): EditableValueBuilder<T>;
    withUniverse(...values: T[]): EditableValueBuilder<T>;
    build(): EditableValue<T>;
}
