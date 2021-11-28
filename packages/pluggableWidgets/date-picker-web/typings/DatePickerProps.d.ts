/**
 * This file was generated from DatePicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export type ModeEnum = "date" | "range";

export type PickerEnum = "date" | "week" | "month" | "quarter" | "year";

export type SizeEnum = "large" | "middle" | "small";

export interface DatePickerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    mode: ModeEnum;
    picker: PickerEnum;
    dateFormat: string;
    onChange?: ActionValue;
    valueFrom?: EditableValue<string | Date>;
    valueTo?: EditableValue<string | Date>;
    value?: EditableValue<string | Date>;
    showTime: boolean;
    size: SizeEnum;
    border: boolean;
}

export interface DatePickerPreviewProps {
    class: string;
    style: string;
    mode: ModeEnum;
    picker: PickerEnum;
    dateFormat: string;
    onChange: {} | null;
    valueFrom: string;
    valueTo: string;
    value: string;
    showTime: boolean;
    size: SizeEnum;
    border: boolean;
}
