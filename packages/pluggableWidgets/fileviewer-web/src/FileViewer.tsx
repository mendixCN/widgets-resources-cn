import { createElement, useEffect, useRef, useState } from "react";
import { ValueStatus } from "mendix";
import PDFViewer from "./components/PDFViewer";
import { FileViewerContainerProps } from "../typings/FileViewerProps";
import "./ui/index.scss";
import { useMxContext } from "./hooks/useMxContext";

export default function FileViewer(props: FileViewerContainerProps) {
    const ref = useRef<any>();
    const [path, setPath] = useState<string | undefined>();
    const [fileName, setFileName] = useState<string | undefined>();

    const objs = useMxContext(ref);
    console.log(objs, 3333);
    useEffect(() => {
        if (objs) {
            console.log(objs[0].dependOn());
        }
    }, [objs]);

    useEffect(() => {
        if (props.urlAttribute.status === ValueStatus.Available) {
            setPath(props.urlAttribute.value?.toString());
        }
        if (props.fileName.status === ValueStatus.Available) {
            setFileName(props.fileName.value?.toString());
        }
    }, [props.fileName, props.urlAttribute]);
    return <PDFViewer ref={ref} fileName={fileName} filePath={path} style={props.style} />;
}
