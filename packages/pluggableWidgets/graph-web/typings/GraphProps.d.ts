/**
 * This file was generated from Graph.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue } from "mendix";

export interface GraphContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    nodes?: ListValue;
    _key?: ListAttributeValue<string>;
    labelNode?: ListAttributeValue<string>;
    edges?: ListValue;
    labelEdge?: ListAttributeValue<string>;
    From?: ListAttributeValue<string>;
    To?: ListAttributeValue<string>;
}

export interface GraphPreviewProps {
    class: string;
    style: string;
    nodes: {} | { type: string } | null;
    _key: string;
    labelNode: string;
    edges: {} | { type: string } | null;
    labelEdge: string;
    From: string;
    To: string;
}
