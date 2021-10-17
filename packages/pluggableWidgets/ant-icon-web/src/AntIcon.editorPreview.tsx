import { parseStyle } from "@mendix-cn/piw-utils-internal";
import { createElement } from "react";
import { AntIconPreviewProps } from "../typings/AntIconProps";
import AntIconComponent from "./components/AntIconComponent";

declare function require(name: string): string;

export function preview(props: AntIconPreviewProps) {
    console.log(parseStyle(props.style));

    return (
        <AntIconComponent
            icon={props.datasourceType === "addon" ? props.value : props.buildInIcon}
            class={props.class}
            style={parseStyle(props.style)}
            spin={props.spin}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/AntIcon.scss");
}
