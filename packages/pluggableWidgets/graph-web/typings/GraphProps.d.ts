/**
 * This file was generated from Graph.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, EditableValue, ListValue, ListActionValue, ListAttributeValue, WebImage } from "mendix";
import { Big } from "big.js";

export interface GraphContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    bg?: DynamicValue<WebImage>;
    isEditable?: EditableValue<boolean>;
    labelSelected: EditableValue<string>;
    xSelected: EditableValue<Big>;
    ySelected: EditableValue<Big>;
    widthSelected: EditableValue<Big>;
    heightSelected: EditableValue<Big>;
    datasource: ListValue;
    label: ListAttributeValue<string>;
    x: ListAttributeValue<Big>;
    y: ListAttributeValue<Big>;
    width: ListAttributeValue<Big>;
    height: ListAttributeValue<Big>;
    onSelect?: ListActionValue;
    onChange?: ListActionValue;
}

export interface GraphPreviewProps {
    class: string;
    style: string;
    bg: string;
    isEditable: string;
    labelSelected: string;
    xSelected: string;
    ySelected: string;
    widthSelected: string;
    heightSelected: string;
    datasource: {} | { type: string } | null;
    label: string;
    x: string;
    y: string;
    width: string;
    height: string;
    onSelect: {} | null;
    onChange: {} | null;
}
