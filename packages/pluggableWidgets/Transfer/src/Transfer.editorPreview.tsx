import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { TransferPreviewProps } from "../typings/TransferProps";

declare function require(name: string): string;

export class preview extends Component<TransferPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Transfer.css");
}
