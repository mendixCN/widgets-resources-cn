import { Component, ReactNode, createElement } from "react";
import { BaiduMapPreviewProps } from "../typings/BaiduMapProps";

declare function require(name: string): string;

export class preview extends Component<BaiduMapPreviewProps> {
    render(): ReactNode {
        return <span>hello baidu map</span>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/BaiduMap.css");
}
