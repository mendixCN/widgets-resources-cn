/**
 * This file was generated from Anchor.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";

export type AnchorModeEnum = "toc" | "anchor";

export interface LinksType {
    title: string;
    hrefKey: string;
}

export interface LinksPreviewType {
    title: string;
    hrefKey: string;
}

export interface AnchorContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    anchorMode: AnchorModeEnum;
    caption: string;
    links: LinksType[];
}

export interface AnchorPreviewProps {
    class: string;
    style: string;
    anchorMode: AnchorModeEnum;
    caption: string;
    links: LinksPreviewType[];
}
