import { Component, ReactNode, createElement } from "react";
import { GraphPreviewProps } from "../typings/GraphProps";

declare function require(name: string): string;

export class preview extends Component<GraphPreviewProps> {
    render(): ReactNode {
        return <span>1</span>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Graph.css");
}
