/**
 * This file was generated from Transfer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface TransferContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    isDisable: boolean;
    isShowSearch: boolean;
    options: ListValue;
    keyAttribute: ListAttributeValue<string | Big>;
    titleAttribute: ListAttributeValue<string>;
    checkedAttribute: ListAttributeValue<boolean>;
    parentAttribute?: ListAttributeValue<string | Big>;
    rightTitle?: DynamicValue<string>;
    leftTitle?: DynamicValue<string>;
    targetKeys: EditableValue<string>;
    onChange?: ActionValue;
}

export interface TransferPreviewProps {
    class: string;
    style: string;
    isDisable: boolean;
    isShowSearch: boolean;
    options: {} | { type: string } | null;
    keyAttribute: string;
    titleAttribute: string;
    checkedAttribute: string;
    parentAttribute: string;
    rightTitle: string;
    leftTitle: string;
    targetKeys: string;
    onChange: {} | null;
}
