import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { AntMenuPreviewProps } from "../typings/AntMenuProps";

declare function require(name: string): string;

export class preview extends Component<AntMenuPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/AntMenu.css");
}
