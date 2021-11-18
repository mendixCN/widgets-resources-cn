import { createElement, useRef, useState } from "react";
import { BackTopContainerProps } from "../typings/BackTopProps";
import { BackTop as BackTopAD } from "antd";

import "./ui/index.scss";
import { useMount } from "ahooks";

export default function BackTop(props: BackTopContainerProps) {
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const ref = useRef<any>();

    useMount(() => {
        setTarget(ref.current.closest(".mx-scrollcontainer-wrapper"));
    });

    return (
        <div ref={ref}>
            <BackTopAD
                duration={props.duration ?? 450}
                visibilityHeight={props.visibilityHeight ?? 400}
                target={() => (target ? target : window)}
            >
                {props.content ?? (
                    <div
                        style={{
                            height: 40,
                            width: 40,
                            lineHeight: "40px",
                            borderRadius: 4,
                            backgroundColor: "#1088e9",
                            color: "#fff",
                            textAlign: "center",
                            fontSize: 14
                        }}
                    >
                        UP
                    </div>
                )}
            </BackTopAD>
        </div>
    );
}
