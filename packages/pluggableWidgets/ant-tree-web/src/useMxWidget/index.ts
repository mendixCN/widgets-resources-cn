import { useInterval } from "ahooks";
import { useRef, useState, MutableRefObject } from "react";
const _require = window.require as any;

export default (): [MutableRefObject<any>, any, any, any] => {
    const ref = useRef<any>();
    const [widget, setWidget] = useState<any>();
    const [mxContext, setMxContext] = useState<any>();
    const [mxobj, setMxobj] = useState<any>();
    const [interval, setInterval] = useState<number | null | undefined>(300);

    useInterval(
        () => {
            _require(["dijit/registry"], (registry: any) => {
                const widget2 = registry.getEnclosingWidget(ref.current);
                if (widget2) {
                    setWidget(widget2);
                    setMxContext(widget2.mxform.getContext());
                    setMxobj(widget2.mxform.getContext().getObject());
                    setInterval(null);
                }
            });
        },
        interval,
        { immediate: false }
    );

    return [ref, widget, mxContext, mxobj];
};
