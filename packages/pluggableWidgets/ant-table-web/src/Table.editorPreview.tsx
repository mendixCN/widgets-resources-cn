import { createElement } from "react";
import { TablePreviewProps } from "../typings/TableProps";
import PreviewComponent from "./components/PreviewComponent";
declare function require(name: string): string;

export function preview(props: TablePreviewProps) {
    return (
        <PreviewComponent
            fillContainer={props.fillContainer}
            size={props.size}
            enablePaging={props.enablePaging}
        ></PreviewComponent>
    );
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
