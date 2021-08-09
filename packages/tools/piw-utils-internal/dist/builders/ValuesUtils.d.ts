import { ReactNode } from "react";
import { Big } from "big.js";
import { ListExpressionValue, ListWidgetValue } from "mendix";
export declare function buildListExpression<T extends string | boolean | Date | Big>(value: T): ListExpressionValue<T>;
export declare function buildWidgetValue(value: ReactNode): ListWidgetValue;
