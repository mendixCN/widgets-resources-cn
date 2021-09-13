import { Component, ReactNode, createElement } from "react";

import { TableContainerProps } from "../typings/TableProps";

import "./ui/Table.css";
import TableComponent from "./components/TableComponent";

export default class Table extends Component<TableContainerProps> {
    render(): ReactNode {
        return <TableComponent></TableComponent>;
    }
}
