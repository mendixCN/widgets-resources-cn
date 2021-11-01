import { RefObject, useState } from "react";
import useInterval from "./useInterval";
import util from "./util";

export const useMxContext = (ref: RefObject<any>) => {
    const [objs, setObjs] = useState<any[]>();

    const [interval, setInterval] = useState<number | null>(1000);

    useInterval(
        () => {
            if (ref.current) {
                setInterval(null);
                util(ref.current, d => {
                    setObjs(d);
                });
            }
        },
        interval,
        { immediate: true }
    );

    return objs;
};
