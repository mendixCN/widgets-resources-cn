import { createElement } from "react";
import { UnityPreviewProps } from "../typings/UnityProps";
import UnityFC from "./components/UnityFC";

declare function require(name: string): string;

export function preview(props: UnityPreviewProps) {
    console.log(props);
    return <UnityFC name={""} hoverMethod="" modelPath={props.unityModelPath} class={props.class}></UnityFC>;
}

export function getPreviewCss(): string {
    return require("./ui/Unity.css");
}
