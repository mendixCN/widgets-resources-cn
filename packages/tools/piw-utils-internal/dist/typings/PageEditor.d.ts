export declare type Properties = PropertyGroup[];
export declare type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};
export declare type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[];
    objects?: ObjectProperties[];
    properties?: Properties[];
};
export declare type Problem = {
    property?: string;
    severity?: "error" | "warning" | "deprecation";
    message: string;
    studioMessage?: string;
    url?: string;
    studioUrl?: string;
};
export declare type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[];
};
/**
 * Structure preview typings
 */
declare type BaseProps = {
    type: string;
    grow?: number;
};
export declare type StructurePreviewProps = ImageProps | ContainerProps | RowLayoutProps | TextProps | DropZoneProps | SelectableProps;
export declare type ImageProps = BaseProps & {
    type: "Image";
    document?: string;
    data?: string;
    width?: number;
    height?: number;
};
export declare type ContainerProps = BaseProps & {
    type: "Container";
    children?: StructurePreviewProps[];
    borders?: boolean;
    borderRadius?: number;
    borderWidth?: number;
    backgroundColor?: string;
    padding?: number;
};
export declare type RowLayoutProps = BaseProps & {
    type: "RowLayout";
    children: StructurePreviewProps[];
    borders?: boolean;
    borderRadius?: number;
    borderWidth?: number;
    columnSize?: "fixed" | "grow";
    backgroundColor?: string;
    padding?: number;
};
export declare type TextProps = BaseProps & {
    type: "Text";
    content: string;
    fontSize?: number;
    fontColor?: string;
    bold?: boolean;
    italic?: boolean;
};
export declare type DropZoneProps = BaseProps & {
    type: "DropZone";
    property: object;
    placeholder?: string;
};
export declare type SelectableProps = BaseProps & {
    object: object;
    child: StructurePreviewProps;
};
export {};
