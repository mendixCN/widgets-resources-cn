import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { SelectPreviewProps } from "../typings/SelectProps";

declare function require(name: string): string;

export class preview extends Component<SelectPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Select.css");
}
