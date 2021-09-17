import { TablePreviewProps } from "../typings/TableProps";
import { Component, createElement, ReactNode } from "react";
import PreviewComponent from "./components/PreviewComponent";
declare function require(name: string): string;

export class preview extends Component<TablePreviewProps> {
    render(): ReactNode {
        return <PreviewComponent enablePaging={this.props.enablePaging}></PreviewComponent>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
