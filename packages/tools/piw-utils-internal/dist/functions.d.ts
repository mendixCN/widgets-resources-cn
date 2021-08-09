import { ActionValue, DynamicValue, EditableValue } from "mendix";
export declare const executeAction: (action?: ActionValue | undefined) => void;
export declare const isAvailable: (property: DynamicValue<any> | EditableValue<any>) => boolean;
export declare const parseStyle: (style?: string) => {
    [key: string]: string;
};
export declare const debounce: <F extends (...args: any[]) => any>(func: F, waitFor: number) => (...args: Parameters<F>) => ReturnType<F>;
