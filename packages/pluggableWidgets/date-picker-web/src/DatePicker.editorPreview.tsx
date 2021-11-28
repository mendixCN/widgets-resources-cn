import { parseStyle } from "@mendix-cn/piw-utils-internal";
import { createElement } from "react";
import { DatePickerPreviewProps } from "../typings/DatePickerProps";

declare function require(name: string): string;

export function preview(props: DatePickerPreviewProps) {
    return <div style={parseStyle(props.style)}></div>;
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
