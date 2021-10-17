import { createElement, useEffect, useMemo, useState } from "react";
import { ValueStatus } from "mendix";

import { AntIconContainerProps } from "../typings/AntIconProps";
import AntIconComponent from "./components/AntIconComponent";

import "./ui/AntIcon.scss";

export default function AntIcon(props: AntIconContainerProps) {
    const iconSourceList = useMemo(() => props.iconSourceList.map(d => d.url), []);
    const [icon, setIcon] = useState<string | undefined>();
    useEffect(() => {
        if (props.valueAttribute && props.valueAttribute.status === ValueStatus.Available) {
            setIcon(props.valueAttribute.value?.toString());
        }
        if (!props.valueAttribute) {
            setIcon(props.datasourceType === "addon" ? props.value : props.buildInIcon);
        }
    }, [props.valueAttribute]);
    return (
        <AntIconComponent
            iconSourceList={iconSourceList}
            class={props.class}
            style={props.style}
            name={props.name}
            tabIndex={props.tabIndex}
            icon={icon}
            spin={props.spin}
        ></AntIconComponent>
    );
}
