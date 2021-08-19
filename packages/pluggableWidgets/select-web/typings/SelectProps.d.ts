/**
 * This file was generated from Select.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { EditableValue, ListValue, ListAttributeValue } from "mendix";

export interface SelectContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    options: ListValue;
    value: EditableValue<string>;
    valueLabel: ListAttributeValue<string>;
    optionLabel: ListAttributeValue<string>;
}

export interface SelectPreviewProps {
    class: string;
    style: string;
    options: {} | { type: string } | null;
    value: string;
    valueLabel: string;
    optionLabel: string;
}
