import { parseStyle } from "@mendix-cn/piw-utils-internal";
import { createElement } from "react";
import { AffixWebPreviewProps } from "../typings/AffixWebProps";

declare function require(name: string): string;

export function preview(props: AffixWebPreviewProps) {
    return <div style={parseStyle(props.style)}></div>;
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
