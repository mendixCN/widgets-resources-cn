/**
 * This file was generated from Demo.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type BootstrapStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export type DemoTypeEnum = "badge" | "label";

export interface DemoContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttribute?: EditableValue<string | Big>;
    demoValue: string;
    bootstrapStyle: BootstrapStyleEnum;
    demoType: DemoTypeEnum;
    onClickAction?: ActionValue;
}

export interface DemoPreviewProps {
    class: string;
    style: string;
    valueAttribute: string;
    demoValue: string;
    bootstrapStyle: BootstrapStyleEnum;
    demoType: DemoTypeEnum;
    onClickAction: {} | null;
}
