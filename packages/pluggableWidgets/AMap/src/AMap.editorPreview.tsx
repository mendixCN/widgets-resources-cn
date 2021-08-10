import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { AMapPreviewProps } from "../typings/AMapProps";

declare function require(name: string): string;

export class preview extends Component<AMapPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/AMap.css");
}
