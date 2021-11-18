import { createElement, useRef, useState } from "react";
import { Anchor as AnchorAntD } from "antd";

import { AnchorContainerProps } from "../typings/AnchorProps";

import "./ui/index.scss";
import { useMount } from "ahooks";

export default function Anchor(props: AnchorContainerProps) {
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const ref = useRef<any>();

    if (props.anchorMode === "toc") {
        useMount(() => {
            setTarget(ref.current.closest(".mx-scrollcontainer-wrapper"));
        });
    }

    return props.anchorMode === "anchor" ? (
        <a id={props.caption} href={`#${props.caption}`}>
            #{props.caption}
        </a>
    ) : (
        <div ref={ref}>
            <AnchorAntD
                onChange={link => {
                    console.log(link);
                }}
                getContainer={() => (target ? target : window)}
            >
                {props.links.map(link => (
                    <AnchorAntD.Link key={link.hrefKey} title={link.title} href={"#" + link.hrefKey} />
                ))}
            </AnchorAntD>
        </div>
    );
}
