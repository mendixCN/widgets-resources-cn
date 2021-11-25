import { Component, ReactNode, createElement } from "react";
import { SelectPreviewProps } from "../typings/SelectProps";

declare function require(name: string): string;

export class preview extends Component<SelectPreviewProps> {
    render(): ReactNode {
        return <span>hello</span>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
