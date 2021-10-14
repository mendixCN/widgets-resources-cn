import { createElement, useEffect, useState } from "react";
import { ValueStatus } from "mendix";
import PDFViewer from "./components/PDFViewer";
import { FileViewerContainerProps } from "../typings/FileViewerProps";
import "./ui/index.scss";

export default function FileViewer(props: FileViewerContainerProps) {
    const [path, setPath] = useState<string | undefined>();
    const [fileName, setFileName] = useState<string | undefined>();

    useEffect(() => {
        if (props.urlAttribute.status == ValueStatus.Available) {
            setPath(props.urlAttribute.value?.toString());
        }
        if (props.fileName.status == ValueStatus.Available) {
            setFileName(props.fileName.value?.toString());
        }
    }, [props.fileName, props.urlAttribute]);
    return <PDFViewer fileName={fileName} filePath={path} style={props.style} />;
}
