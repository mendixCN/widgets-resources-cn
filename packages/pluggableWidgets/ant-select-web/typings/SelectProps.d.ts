/**
 * This file was generated from Select.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListActionValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface SelectContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    searchValue: EditableValue<string>;
    options: ListValue;
    optionValue: ListAttributeValue<string | Big>;
    optionLabel: ListAttributeValue<string>;
    selectList?: ListValue;
    optionValueM?: ListAttributeValue<string | Big>;
    value?: EditableValue<string>;
    onSelect?: ListActionValue;
    onDeselect?: ListActionValue;
    onDeselectM?: ListActionValue;
    isMultiConst: boolean;
    onCreate?: ActionValue;
}

export interface SelectPreviewProps {
    class: string;
    style: string;
    searchValue: string;
    options: {} | { type: string } | null;
    optionValue: string;
    optionLabel: string;
    selectList: {} | { type: string } | null;
    optionValueM: string;
    value: string;
    onSelect: {} | null;
    onDeselect: {} | null;
    onDeselectM: {} | null;
    isMultiConst: boolean;
    onCreate: {} | null;
}
