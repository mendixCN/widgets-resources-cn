/**
 * This file was generated from AMap.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, EditableValue, ListValue, ListActionValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type ModeEnum = "nav" | "marker" | "location";

export type CenterTypeEnum = "staticValue" | "dynamicValue";

export type NavMethodEnum = "driving";

export type PolicyEnum = "LEAST_TIME" | "LEAST_FEE" | "LEAST_DISTANCE" | "REAL_TRAFFIC";

export interface AMapContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    amapKey: DynamicValue<string>;
    mode: ModeEnum;
    enableAutoFocus: boolean;
    enableLocationMode: boolean;
    centerType: CenterTypeEnum;
    latCenterStatic: Big;
    lngCenterStatic: Big;
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
    navMethod: NavMethodEnum;
    policy: PolicyEnum;
    startLng?: EditableValue<Big>;
    startLat?: EditableValue<Big>;
    endLng?: EditableValue<Big>;
    endLat?: EditableValue<Big>;
}

export interface AMapPreviewProps {
    class: string;
    style: string;
    amapKey: string;
    mode: ModeEnum;
    enableAutoFocus: boolean;
    enableLocationMode: boolean;
    centerType: CenterTypeEnum;
    latCenterStatic: number | null;
    lngCenterStatic: number | null;
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
    navMethod: NavMethodEnum;
    policy: PolicyEnum;
    startLng: string;
    startLat: string;
    endLng: string;
    endLat: string;
}
