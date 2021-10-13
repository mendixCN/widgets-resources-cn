/**
 * This file was generated from FileViewer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";

export interface FileViewerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    urlAttribute: EditableValue<string>;
    fileName: EditableValue<string>;
}

export interface FileViewerPreviewProps {
    class: string;
    style: string;
    urlAttribute: string;
    fileName: string;
}
