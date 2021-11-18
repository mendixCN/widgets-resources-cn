import { useMount, useWhyDidYouUpdate } from "ahooks";
import { Affix } from "antd";
import { createElement, CSSProperties, ReactNode, useRef, useState } from "react";

export interface AffixComponentProps {
    children: ReactNode;
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    offsetBottom?: number;
    offsetTop?: number;
    target: string;
    onChange?: (affixed?: boolean) => void;
}

export default function AffixComponent(props: AffixComponentProps) {
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const ref = useRef<any>();

    useMount(() => {
        setTarget(ref.current.closest(".mx-scrollcontainer-wrapper"));
    });
    useWhyDidYouUpdate(`${props.name}`, { ...props });
    return (
        <div className={props.class} tabIndex={props.tabIndex} style={props.style} ref={ref}>
            <Affix
                onChange={props.onChange}
                target={() => target}
                offsetTop={props.offsetTop}
                offsetBottom={props.offsetBottom}
            >
                {props.children}
            </Affix>
        </div>
    );
}
