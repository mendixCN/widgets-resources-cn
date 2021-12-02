import { createElement, useEffect, useRef, useState } from "react";
import PDFViewer from "./components/PDFViewer";
import { FileViewerContainerProps } from "../typings/FileViewerProps";
import "./ui/index.scss";
import { useMxContext } from "./hooks/useMxContext";
import useInterval from "./hooks/useInterval";

export default function FileViewer(props: FileViewerContainerProps) {
    const ref = useRef<any>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const nearbyDataViewObj = useRef<any>();
    const [path, setPath] = useState<string | undefined>();
    const [fileName, setFileName] = useState<string | undefined>();

    const objs = useMxContext(ref);
    useEffect(() => {
        if (objs) {
            nearbyDataViewObj.current = objs[0][0][1];
        }
    }, [objs]);

    useInterval(() => {
        if (nearbyDataViewObj.current?.value?.status === "available") {
            if (nearbyDataViewObj.current.value.value.inheritsFrom("System.FileDocument")) {
                setPath(`/file?guid=${nearbyDataViewObj.current.value.value.getGuid()}`);
                setFileName(nearbyDataViewObj.current.value.value.get("Name"));
            } else {
                setErrorMessage("需要把本组件放入System.FileDocument的DataView中!!!");
            }
        }
    }, 500);

    return (
        <div style={props.style} className={props.class} tabIndex={props.tabIndex}>
            {errorMessage ? (
                <span>{errorMessage}</span>
            ) : (
                <PDFViewer ref={ref} fileName={fileName} filePath={path} style={props.style} />
            )}
        </div>
    );
}
