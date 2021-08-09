import { ActionValue, DynamicValue } from "mendix";
export declare function dynamicValue<T>(value?: T, loading?: boolean): DynamicValue<T>;
export declare function actionValue(canExecute?: boolean, isExecuting?: boolean): ActionValue;
