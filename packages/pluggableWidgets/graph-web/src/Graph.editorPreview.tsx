import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { GraphPreviewProps } from "../typings/GraphProps";

declare function require(name: string): string;

export class preview extends Component<GraphPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Graph.css");
}
