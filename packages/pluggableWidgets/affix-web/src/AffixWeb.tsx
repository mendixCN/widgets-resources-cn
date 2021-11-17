import { createElement, useCallback } from "react";

import { AffixWebContainerProps } from "../typings/AffixWebProps";

import "./ui/index.scss";
import AffixComponent from "./components/AffixComponent";

export default function AffixWeb(props: AffixWebContainerProps) {
    const onChange = useCallback(
        (affix: boolean) => {
            if (props.onChange && props.onChange.canExecute && affix) {
                props.onChange.execute();
            }
        },
        [props.onChange]
    );
    return (
        <AffixComponent
            name={props.name}
            class={props.class}
            style={props.style}
            tabIndex={props.tabIndex}
            offsetBottom={props.stickPosition === "bottom" ? props.offsetBottom : undefined}
            offsetTop={props.stickPosition === "top" ? props.offsetTop : undefined}
            target={props.target}
            onChange={onChange}
        >
            {props.content}
        </AffixComponent>
    );
}
