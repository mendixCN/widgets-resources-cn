import { createElement, useMemo } from "react";

import { AntIconContainerProps } from "../typings/AntIconProps";
import AntIconComponent from "./components/AntIconComponent";

import "./ui/AntIcon.scss";

export default function AntIcon(props: AntIconContainerProps) {
    const iconSourceList = useMemo(() => props.iconSourceList.map(d => d.url), []);
    return (
        <AntIconComponent
            iconSourceList={iconSourceList}
            class={props.class}
            style={props.style}
            name={props.name}
            tabIndex={props.tabIndex}
            icon={props.datasourceType === "addon" ? props.value : props.buildInIcon}
        ></AntIconComponent>
    );
}
