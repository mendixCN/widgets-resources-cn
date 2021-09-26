import { useCreation, useHover } from "ahooks";
import { createElement, CSSProperties, useEffect, useRef, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

export interface UnityFCProps {
    placeholder?: string;
    style?: CSSProperties;
    class: string;
    tabIndex?: number;
    modelPath: string;
    hoverGo?: string;
    hoverMethod: string;
    name: string;
    onEvent?: (name: string, value: string) => void;
    eventNames?: string[];
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

    const ref = useRef<any>();
    const isHovering = useHover(ref);

    useEffect(() => {
        if (props.hoverGo) {
            unityContext.send(props.hoverGo, props.hoverMethod, isHovering ? 1 : 0);
        }
    }, [isHovering]);

    useEffect(() => {
        if (!unityContext) {
            return;
        }
        (window as any).unityContext = (window as any).unityContext ? (window as any).unityContext : {};
        (window as any).unityContext[props.name] = unityContext;

        if (props.onEvent) {
            props.eventNames?.forEach(eventName => {
                unityContext.on(eventName, value => {
                    props.onEvent!(eventName, value);

                    if (eventName === "ClickObject") {
                        setPipeName(value);
                    }
                });
            });
        }

        return () => {
            unityContext.removeAllEventListeners();
        };
    }, [unityContext]);

    const [pipeName, setPipeName] = useState<string>();

    return (
        <div>
            <div ref={ref}>
                <Unity
                    className={props.class}
                    tabIndex={props.tabIndex}
                    style={props.style}
                    unityContext={unityContext}
                />
            </div>
            <span>选择的管道名称 {pipeName}</span>
            <button
                className="btn mx-button mx-name-actionButton2 btn-default"
                onClick={() => {
                    if (pipeName) {
                        unityContext.send(pipeName, "StopShake");
                    }
                }}
            >
                停止振动
            </button>
            <button
                className="btn mx-button mx-name-actionButton2 btn-default"
                onClick={() => {
                    if (pipeName) {
                        unityContext.send(pipeName, "StartShake");
                    }
                }}
            >
                开始振动
            </button>
        </div>
    );
}
