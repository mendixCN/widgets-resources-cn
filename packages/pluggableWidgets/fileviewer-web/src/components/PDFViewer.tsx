import { createElement, useRef, useEffect, useState, CSSProperties, forwardRef } from "react";
import viewer, { WebViewerInstance } from "@pdftron/webviewer";

export interface InputProps {
    style?: CSSProperties;
    fileName?: string;
    filePath?: string;
}

export default forwardRef<HTMLDivElement, InputProps>((props, ref) => {
    const innerRef = useRef<any>();
    const [instance, setInstance] = useState<null | WebViewerInstance>(null);

    useEffect(() => {
        viewer(
            {
                path: "/widgets/resources/lib"
            },
            innerRef.current
        ).then(instance => {
            setInstance(instance);
        });
    }, []);

    // load document coming from the URL attribute
    useEffect(() => {
        if (instance && props.fileName && props.filePath) {
            const extension = props.fileName.substring(props.fileName.lastIndexOf(".") + 1);
            instance.loadDocument(props.filePath, { extension });
        }
    }, [instance, props.fileName, props.filePath]);

    return (
        <div
            className="webviewer"
            ref={e => {
                if (ref) {
                    if (typeof ref == "function") {
                        ref(e);
                    } else {
                        ref.current = e;
                    }
                }
                innerRef.current = e;
            }}
            style={props.style}
        ></div>
    );
});
