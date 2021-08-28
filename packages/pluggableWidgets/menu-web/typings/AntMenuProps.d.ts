/**
 * This file was generated from AntMenu.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue } from "mendix";

export interface AntMenuContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    entity: string;
    refName: string;
    iconString: string;
    title: string;
    isFolder: string;
    onMenuItemClick?: ActionValue;
}

export interface AntMenuPreviewProps {
    class: string;
    style: string;
    entity: string;
    refName: string;
    iconString: string;
    title: string;
    isFolder: string;
    onMenuItemClick: {} | null;
}
