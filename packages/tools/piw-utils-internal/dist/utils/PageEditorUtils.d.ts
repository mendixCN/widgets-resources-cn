/**
 * TODO: Include tests for methods
 */
import { Properties, Property, PropertyGroup } from "../typings";
export declare function hidePropertyIn<T, TKey extends keyof T>(propertyGroups: PropertyGroup[], _value: T, key: TKey): void;
export declare function hidePropertyIn<T, TKey extends keyof T>(propertyGroups: PropertyGroup[], _value: T, key: TKey, nestedPropIndex: number, nestedPropKey: T[TKey] extends Array<infer TChild> ? keyof TChild : never): void;
export declare function hidePropertiesIn<T>(propertyGroups: PropertyGroup[], _value: T, keys: Array<keyof T>): void;
export declare function hideNestedPropertiesIn<T, TKey extends keyof T>(propertyGroups: Properties, _value: T, key: TKey, nestedPropIndex: number, nestedPropKeys: Array<T[TKey] extends Array<infer TChild> ? keyof TChild : never>): void;
export declare function changePropertyIn<T, TKey extends keyof T>(propertyGroups: PropertyGroup[], _value: T, modify: (prop: Property) => void, key: TKey): void;
export declare function changePropertyIn<T, TKey extends keyof T>(propertyGroups: PropertyGroup[], _value: T, modify: (prop: Property) => void, key: TKey, nestedPropIndex: number, nestedPropKey: string): void;
export declare function transformGroupsIntoTabs(properties: Properties): void;
export declare function moveProperty(fromIndex: number, toIndex: number, properties: Properties): void;
