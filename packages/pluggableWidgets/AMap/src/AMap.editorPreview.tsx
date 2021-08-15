import { Component, ReactNode, createElement } from "react";
import { AMapComponent } from "./components/AMapComponent";
import { AMapPreviewProps } from "../typings/AMapProps";

declare function require(name: string): string;

export class preview extends Component<AMapPreviewProps> {
    render(): ReactNode {
        return <AMapComponent marks={[]} zoom={15} lat={22.233} lng={113.33} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/AMap.css");
}
