import { CSSProperties } from "react";
export declare type WidthUnitEnum = "percentage" | "pixels";
export declare type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";
export interface Dimensions {
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
}
export declare function getDimensions<T extends Dimensions>(props: T): CSSProperties;
