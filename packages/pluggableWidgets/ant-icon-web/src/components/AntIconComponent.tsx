import { createElement, CSSProperties } from "react";
import create, { BuildinIconScriptUrl } from "./IconFont";

const IconFont = create({
    scriptUrl: BuildinIconScriptUrl
});

export interface AntIconComponentProps {
    name?: string;
    class: string;
    style?: CSSProperties | undefined;
    tabIndex?: number;
    icon: string;
}

export default function AntIconComponent(props: AntIconComponentProps) {
    return (
        <IconFont
            type={"icon-" + props.icon}
            name={props.name}
            className={props.class}
            style={props.style}
            tabIndex={props.tabIndex}
        />
    );
}
