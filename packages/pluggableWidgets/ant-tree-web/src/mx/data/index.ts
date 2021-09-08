import { useMap } from "ahooks";
import { useCallback, useEffect, useRef } from "react";

export function removeMxObject(guid: string) {
    new Promise<void>((resolve, reject) => {
        (window as any).mx.data.remove({
            guid,
            callback: resolve,
            error: reject
        });
    });
}

export function removeMxObjects(guids: string[]) {
    new Promise<void>((resolve, reject) => {
        (window as any).mx.data.remove({
            guids,
            callback: resolve,
            error: reject
        });
    });
}

export function useMxCache() {
    const [, { set, get }] = useMap<string, any>();

    const restore = useCallback(
        (guids: string | string[] | undefined) => {
            if (!guids) {
                guids = [];
            }
            if (typeof guids === "string") {
                guids = [guids];
            }
            guids.forEach(guid => (window as any).mx.data.updateInCache(get(guid)));
        },
        [get]
    );
    const ref = useRef(restore);
    useEffect(() => {
        ref.current = restore;
    }, [restore]);
    const cacheMxobject = useCallback(
        (mxobjs: any | any[]) => {
            if (!mxobjs) {
                return;
            }
            if (!Array.isArray(mxobjs)) {
                mxobjs = [mxobjs];
            }
            mxobjs.forEach((mxobj: any) => {
                set(mxobj.getGuid(), mxobj.jsonData);
            });
        },
        [set]
    );
    return [ref, cacheMxobject] as const;
}
