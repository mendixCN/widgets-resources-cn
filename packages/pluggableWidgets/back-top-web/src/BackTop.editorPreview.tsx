import { parseStyle } from "@mendix-cn/piw-utils-internal";
import { createElement } from "react";
import { BackTopPreviewProps } from "../typings/BackTopProps";

declare function require(name: string): string;

export function preview(props: BackTopPreviewProps) {
    return <div style={parseStyle(props.style)}></div>;
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
