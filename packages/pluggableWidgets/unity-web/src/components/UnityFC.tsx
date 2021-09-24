import { useCreation } from "ahooks";
import { createElement, CSSProperties } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

export interface UnityFCProps {
    placeholder?: string;
    style?: CSSProperties;
    class: string;
    tabIndex?: number;
    modelPath: string;
}

export default function UnityFC(props: UnityFCProps) {
    const unityContext = useCreation(
        () =>
            new UnityContext({
                loaderUrl: `${props.modelPath}.loader.js`,
                dataUrl: `${props.modelPath}.data`,
                frameworkUrl: `${props.modelPath}.framework.js`,
                codeUrl: `${props.modelPath}.wasm`
            }),
        [props.modelPath]
    );
    return <Unity className={props.class} tabIndex={props.tabIndex} style={props.style} unityContext={unityContext} />;
}
