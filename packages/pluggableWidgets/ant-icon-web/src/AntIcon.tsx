import { createElement } from "react";

import { AntIconContainerProps } from "../typings/AntIconProps";
import AntIconComponent from "./components/AntIconComponent";

import "./ui/AntIcon.scss";

export default function AntIcon(props: AntIconContainerProps) {
    return (
        <AntIconComponent
            class={props.class}
            style={props.style}
            name={props.name}
            tabIndex={props.tabIndex}
            icon={props.buildInIcon}
        ></AntIconComponent>
    );
}
