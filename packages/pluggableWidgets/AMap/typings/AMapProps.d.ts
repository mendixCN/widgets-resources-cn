/**
 * This file was generated from AMap.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";
import { Big } from "big.js";

export interface AMapContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    sampleText: string;
    lat?: EditableValue<Big>;
    lng?: EditableValue<Big>;
    onChange?: ActionValue;
}

export interface AMapPreviewProps {
    class: string;
    style: string;
    sampleText: string;
    lat: string;
    lng: string;
    onChange: {} | null;
}
