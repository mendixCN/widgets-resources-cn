/**
 * This file was generated from AffixWeb.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue } from "mendix";

export type StickPositionEnum = "top" | "bottom";

export interface AffixWebContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    stickPosition: StickPositionEnum;
    offsetBottom: number;
    offsetTop: number;
    target: string;
    onChange?: ActionValue;
    content: ReactNode;
}

export interface AffixWebPreviewProps {
    class: string;
    style: string;
    stickPosition: StickPositionEnum;
    offsetBottom: number | null;
    offsetTop: number | null;
    target: string;
    onChange: {} | null;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}
