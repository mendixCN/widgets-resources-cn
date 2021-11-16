import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { AffixWebPreviewProps } from "../typings/AffixWebProps";

declare function require(name: string): string;

export class preview extends Component<AffixWebPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/AffixWeb.css");
}
