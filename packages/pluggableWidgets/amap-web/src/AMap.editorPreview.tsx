import { parseStyle } from "@mendix-cn/piw-utils-internal";
import { Component, ReactNode, createElement } from "react";
import { AMapPreviewProps } from "../typings/AMapProps";

// const svgString = require("./assets/previewQrCode.svg") as string;
import logo from "./assets/map-9.png";

declare function require(name: string): string;

export class preview extends Component<AMapPreviewProps> {
    render(): ReactNode {
        return <img style={parseStyle(this.props.style)} src={logo}></img>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/AMap.css");
}
