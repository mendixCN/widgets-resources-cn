/**
 * This file was generated from AntMenu.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";

export type MenuModeEnum = "vertical" | "horizontal" | "inline";

export interface AntMenuContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    datasourceMicroflow: string;
    entity: string;
    refName: string;
    iconString: string;
    title: string;
    isFolder: string;
    menuMode: MenuModeEnum;
    onMenuItemClick: string;
}

export interface AntMenuPreviewProps {
    class: string;
    style: string;
    datasourceMicroflow: string;
    entity: string;
    refName: string;
    iconString: string;
    title: string;
    isFolder: string;
    menuMode: MenuModeEnum;
    onMenuItemClick: string;
}
