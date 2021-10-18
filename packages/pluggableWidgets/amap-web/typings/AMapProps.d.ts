/**
 * This file was generated from AMap.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { EditableValue, ListValue, ListActionValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface AMapContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    enableAutoFocus: boolean;
    enableLocationMode: boolean;
    latCenter?: EditableValue<Big>;
    lngCenter?: EditableValue<Big>;
    zoomAttribute?: EditableValue<Big>;
    zoomConst: Big;
    enableMarker: boolean;
    displayMarker: boolean;
    markers?: ListValue;
    titleMarker?: ListAttributeValue<string>;
    lngMarker?: ListAttributeValue<Big>;
    latMarker?: ListAttributeValue<Big>;
    markerSelect?: ListActionValue;
}

export interface AMapPreviewProps {
    class: string;
    style: string;
    enableAutoFocus: boolean;
    enableLocationMode: boolean;
    latCenter: string;
    lngCenter: string;
    zoomAttribute: string;
    zoomConst: number | null;
    enableMarker: boolean;
    displayMarker: boolean;
    markers: {} | { type: string } | null;
    titleMarker: string;
    lngMarker: string;
    latMarker: string;
    markerSelect: {} | null;
}
