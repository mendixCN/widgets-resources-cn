import { dynamicValue } from "./DynamicActionValueBuilder";
export function buildListExpression(value) {
    return { get: () => dynamicValue(value) };
}
export function buildWidgetValue(value) {
    return { get: () => value };
}
