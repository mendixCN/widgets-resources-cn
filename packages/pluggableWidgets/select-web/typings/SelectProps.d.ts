/**
 * This file was generated from Select.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface SelectContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    options: ListValue;
    value: EditableValue<string>;
    optionValue: ListAttributeValue<string | Big>;
    optionLabel: ListAttributeValue<string>;
    onChange?: ActionValue;
    isMultiConst: boolean;
    isMutiAttribute?: EditableValue<boolean>;
}

export interface SelectPreviewProps {
    class: string;
    style: string;
    options: {} | { type: string } | null;
    value: string;
    optionValue: string;
    optionLabel: string;
    onChange: {} | null;
    isMultiConst: boolean;
    isMutiAttribute: string;
}
