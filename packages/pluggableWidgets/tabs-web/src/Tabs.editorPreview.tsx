import { parseStyle } from "@mendix-cn/piw-utils-internal";
import { createElement } from "react";
import { TabsPreviewProps } from "../typings/TabsProps";

declare function require(name: string): string;

export function preview(props: TabsPreviewProps) {
    return <div style={parseStyle(props.style)}></div>;
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
