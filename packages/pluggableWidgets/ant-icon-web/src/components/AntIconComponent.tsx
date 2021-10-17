import { createElement, CSSProperties } from "react";
import create, { BuildinIconScriptUrl, loadIconLib } from "./IconFont";

const IconFont = create();

export interface AntIconComponentProps {
    name?: string;
    class: string;
    style?: CSSProperties | undefined;
    tabIndex?: number;
    icon?: string;
    iconSourceList?: string[];
    spin?: boolean;
}

export default function AntIconComponent(props: AntIconComponentProps) {
    loadIconLib(props.iconSourceList ? props.iconSourceList : BuildinIconScriptUrl);
    return (
        <IconFont
            type={"icon-" + props.icon}
            name={props.name}
            className={props.class}
            style={props.style}
            tabIndex={props.tabIndex}
            spin={props.spin}
        />
    );
}
