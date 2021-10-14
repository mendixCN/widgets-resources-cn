import { createElement, useRef, useEffect, useState, CSSProperties } from "react";
import viewer, { WebViewerInstance } from "@pdftron/webviewer";

export interface InputProps {
    style?: CSSProperties;
    fileName?: string;
    filePath?: string;
}

const PDFViewer: React.FC<InputProps> = (props: InputProps) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const [instance, setInstance] = useState<null | WebViewerInstance>(null);

    useEffect(() => {
        viewer(
            {
                path: "/widgets/resources/lib"
            },
            viewerRef.current as HTMLDivElement
        ).then(instance => {
            setInstance(instance);
        });
    }, []);

    // load document coming from the URL attribute
    useEffect(() => {
        if (instance && props.fileName && props.filePath) {
            const fileName = props.fileName.substring(props.fileName.lastIndexOf(".") + 1);
            // alert('extension: '+ fileName);
            instance.loadDocument(props.filePath, { extension: fileName });
        }
    }, [instance, props.fileName, props.filePath]);

    return <div className="webviewer" ref={viewerRef} style={props.style}></div>;
};

export default PDFViewer;
