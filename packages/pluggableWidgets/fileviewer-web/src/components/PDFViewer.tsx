import { createElement, useRef, useEffect, useState } from "react";
import viewer, { WebViewerInstance } from "@pdftron/webviewer";

export interface InputProps {
    mendixProps: any;
}

const PDFViewer: React.FC<InputProps> = ({ mendixProps }) => {
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
        if (instance && mendixProps.urlAttribute.value !== "") {
            const fileName = mendixProps.fileName.value.substring(mendixProps.fileName.value.lastIndexOf(".") + 1);
            // alert('extension: '+ fileName);
            instance.loadDocument(mendixProps.urlAttribute.value, { extension: fileName });
        }
    }, [instance, mendixProps.urlAttribute]);

    return <div className="webviewer" ref={viewerRef}></div>;
};

export default PDFViewer;
