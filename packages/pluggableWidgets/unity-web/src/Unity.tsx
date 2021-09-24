import { createElement } from "react";

import { UnityContainerProps } from "../typings/UnityProps";
import UnityFC from "./components/UnityFC";

import "./ui/Unity.css";

export default function Unity(props: UnityContainerProps) {
    return (
        <UnityFC
            style={{ width: "100%", ...props.style }}
            class={props.class}
            modelPath={props.unityModelPath}
        ></UnityFC>
    );
}
