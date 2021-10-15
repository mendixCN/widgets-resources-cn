import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { AntIconPreviewProps } from "../typings/AntIconProps";

declare function require(name: string): string;

export class preview extends Component<AntIconPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/AntIcon.css");
}
