/**
 * This file was generated from Unity.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";

export type ParamTypeEnum = "pt_string" | "pt_number";

export interface InputsType {
    gameObjectName: string;
    methodName: string;
    paramType: ParamTypeEnum;
    stringValue: string;
    numberValue: number;
}

export type ParamTypeEnum = "pt_string" | "pt_number";

export interface OutputsType {
    eventName: string;
    paramType: ParamTypeEnum;
    stringValue: string;
    numberValue: number;
}

export interface InputsPreviewType {
    gameObjectName: string;
    methodName: string;
    paramType: ParamTypeEnum;
    stringValue: string;
    numberValue: number | null;
}

export interface OutputsPreviewType {
    eventName: string;
    paramType: ParamTypeEnum;
    stringValue: string;
    numberValue: number | null;
}

export interface UnityContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    unityModelPath: string;
    inputs: InputsType[];
    outputs: OutputsType[];
}

export interface UnityPreviewProps {
    class: string;
    style: string;
    unityModelPath: string;
    inputs: InputsPreviewType[];
    outputs: OutputsPreviewType[];
}
