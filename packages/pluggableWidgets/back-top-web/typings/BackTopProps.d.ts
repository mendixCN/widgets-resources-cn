/**
 * This file was generated from BackTop.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";

export interface BackTopContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    duration: number;
    visibilityHeight: number;
    content?: ReactNode;
}

export interface BackTopPreviewProps {
    class: string;
    style: string;
    duration: number | null;
    visibilityHeight: number | null;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}
