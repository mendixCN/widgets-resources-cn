import { Component, ReactNode, createElement } from "react";
import { AnchorPreviewProps } from "../typings/AnchorProps";

declare function require(name: string): string;

export class preview extends Component<AnchorPreviewProps> {
    render(): ReactNode {
        return <span></span>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
