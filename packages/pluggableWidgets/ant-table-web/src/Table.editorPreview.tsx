import { Component, ReactNode, createElement } from "react";
import { TablePreviewProps } from "../typings/TableProps";
import TableComponent from "./components/TableComponent";

declare function require(name: string): string;

export class preview extends Component<TablePreviewProps> {
    render(): ReactNode {
        return <TableComponent></TableComponent>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Table.css");
}
