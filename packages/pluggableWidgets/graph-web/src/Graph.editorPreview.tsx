import { parseStyle } from "@mendix-cn/piw-utils-internal";
import { createElement } from "react";
import { GraphPreviewProps } from "../typings/GraphProps";

declare function require(name: string): string;

export function preview(props: GraphPreviewProps) {
    return (
        <div style={parseStyle(props.style)}>
            <span>Graph</span>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
