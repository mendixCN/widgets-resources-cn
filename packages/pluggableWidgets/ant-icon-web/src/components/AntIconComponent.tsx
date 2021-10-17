import { createElement, CSSProperties } from "react";
import create from "./IconFont";

const IconFont = create({
    scriptUrl: "widgets/resources/font_8d5l8fzk5b87iudi.js"
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
