import { Component, ReactNode, createElement } from "react";
import PDFViewer from "./components/PDFViewer";
import { FileViewerPreviewProps } from "../typings/FileViewerProps";

declare function require(name: string): string;

export class preview extends Component<FileViewerPreviewProps> {
    render(): ReactNode {
        return <PDFViewer />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
