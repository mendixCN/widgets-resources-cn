/**
 * This file was generated from Graph.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ListValue, ListAttributeValue } from "mendix";

export interface CustomNodesType {
    nodeType: string;
    templateString: string;
}

export interface CustomNodeAttributesType {
    valueKey: string;
    valueAttribute?: ListAttributeValue<string>;
}

export type EdgeTypeConstEnum = "line" | "polyline" | "quadratic" | "cubic" | "arc";

export type LegendTypeEnum = "edge" | "node" | "all";

export interface LegendConfigsType {
    legendType: LegendTypeEnum;
    legendName: string;
    label: string;
    content?: ReactNode;
}

export interface StyleForEdgeType {
    cluster: string;
    styleString: string;
}

export interface CustomNodesPreviewType {
    nodeType: string;
    templateString: string;
}

export interface CustomNodeAttributesPreviewType {
    valueKey: string;
    valueAttribute: string;
}

export interface LegendConfigsPreviewType {
    legendType: LegendTypeEnum;
    legendName: string;
    label: string;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}

export interface StyleForEdgePreviewType {
    cluster: string;
    styleString: string;
}

export interface GraphContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    nodes?: ListValue;
    nodeTypeConst: string;
    nodeTypeAttribute?: ListAttributeValue<string>;
    _key?: ListAttributeValue<string>;
    labelNode?: ListAttributeValue<string>;
    customNodes: CustomNodesType[];
    customNodeAttributes: CustomNodeAttributesType[];
    edgeTypeConst: EdgeTypeConstEnum;
    edgeTypeAttribute?: ListAttributeValue<string>;
    edges?: ListValue;
    labelEdge?: ListAttributeValue<string>;
    From?: ListAttributeValue<string>;
    To?: ListAttributeValue<string>;
    edgeLegend?: ListAttributeValue<string>;
    nodeLegend?: ListAttributeValue<string>;
    legendConfigs: LegendConfigsType[];
    styleForEdge: StyleForEdgeType[];
}

export interface GraphPreviewProps {
    class: string;
    style: string;
    nodes: {} | { type: string } | null;
    nodeTypeConst: string;
    nodeTypeAttribute: string;
    _key: string;
    labelNode: string;
    customNodes: CustomNodesPreviewType[];
    customNodeAttributes: CustomNodeAttributesPreviewType[];
    edgeTypeConst: EdgeTypeConstEnum;
    edgeTypeAttribute: string;
    edges: {} | { type: string } | null;
    labelEdge: string;
    From: string;
    To: string;
    edgeLegend: string;
    nodeLegend: string;
    legendConfigs: LegendConfigsPreviewType[];
    styleForEdge: StyleForEdgePreviewType[];
}
