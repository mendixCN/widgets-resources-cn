import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { DemoPreviewProps } from "../typings/DemoProps";

declare function require(name: string): string;

export class preview extends Component<DemoPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Demo.css");
}
