import { Component, ReactNode, createElement } from "react";
import PDFViewer from "./components/PDFViewer";
import { FileViewerContainerProps } from "../typings/FileViewerProps";
import "./ui/index.scss";

export default class FileViewer extends Component<FileViewerContainerProps> {
    render(): ReactNode {
        return <PDFViewer mendixProps={this.props} />;
    }
}
