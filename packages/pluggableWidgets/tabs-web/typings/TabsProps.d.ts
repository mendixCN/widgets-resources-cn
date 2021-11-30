/**
 * This file was generated from Tabs.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue, EditableValue } from "mendix";

export interface TabsType {
    caption?: DynamicValue<string>;
    headContent?: ReactNode;
    tabKey: string;
    content: ReactNode;
    disabled: DynamicValue<boolean>;
}

export type TabPositionEnum = "top" | "left";

export interface TabsPreviewType {
    caption: string;
    headContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    tabKey: string;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    disabled: string;
}

export interface TabsContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    activeKey?: EditableValue<string>;
    tabs: TabsType[];
    customHeader: boolean;
    centered: boolean;
    tabPosition: TabPositionEnum;
}

export interface TabsPreviewProps {
    class: string;
    style: string;
    activeKey: string;
    tabs: TabsPreviewType[];
    customHeader: boolean;
    centered: boolean;
    tabPosition: TabPositionEnum;
}
