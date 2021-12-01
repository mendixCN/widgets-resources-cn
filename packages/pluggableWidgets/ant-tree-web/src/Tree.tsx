import { createElement, useCallback, useEffect, useState, Key, ReactElement } from "react";

import { useDebounceFn, useWhyDidYouUpdate } from "ahooks";

import { TreeContainerProps } from "../typings/TreeProps";

import "./ui/index.scss";
import { TreeContainer } from "./components/TreeContainer";
import { DataNode } from "antd/lib/tree";
import useMxWidget from "./useMxWidget";
import { useMxCache } from "./mx/data";

// It's just a simple demo. You can use tree map to optimize update perf.
function updateTreeData(list: DataNode[], key: Key, children: DataNode[]): DataNode[] {
    return list.map(node => {
        if (node.key === key) {
            return {
                ...node,
                children
            };
        }
        if (node.children) {
            return {
                ...node,
                children: updateTreeData(node.children, key, children)
            };
        }
        return node;
    });
}

export const Tree = (props: TreeContainerProps): ReactElement => {
    const [checkedKeys, setCheckedKeys] = useState<string[]>();

    const [treeData, setTreeData] = useState<DataNode[]>([]);

    const [ref, widget] = useMxWidget();

    const [restore, cacheMxobject] = useMxCache();

    const onLoadData = useCallback(
        ({ key: guid, children }: any) =>
            new Promise<void>(resolve => {
                if (children) {
                    resolve();
                    return;
                }

                function handleData(objs: any[]): DataNode[] {
                    return objs
                        ? objs.map<DataNode>(obj => ({
                              title: obj.get(props.title),
                              isLeaf: obj.get(props.isLeaf),
                              key: obj.getGuid()
                          }))
                        : [];
                }

                if (props.datasourceMicroflow) {
                    if (widget) {
                        restore.current(guid);
                        (window as any).mx.data.action({
                            params: {
                                applyto: guid ? "selection" : "none",
                                actionname: props.datasourceMicroflow,
                                guids: guid ? [guid] : []
                            },
                            context: widget.mxcontext,
                            origin: widget.mxform,
                            callback(objs: any[]) {
                                const dataNodes = handleData(objs);
                                if (guid) {
                                    setTreeData(origin => updateTreeData(origin, guid, dataNodes));
                                } else {
                                    setTreeData(dataNodes);
                                }
                                cacheMxobject(objs);
                                resolve();
                            },
                            error(error: Error) {
                                (window as any).mx.ui.error(error.message);
                            }
                        });
                    }
                }
            }),
        [widget, props.datasourceMicroflow, props.isLeaf, props.title, cacheMxobject, restore]
    );

    const onSelect = useCallback(
        (guids: string[] | undefined) => {
            if (widget && props.onSelectMicroflow) {
                restore.current(guids);
                (window as any).mx.data.action({
                    params: {
                        applyto: "selection",
                        actionname: props.onSelectMicroflow,
                        guids
                    },
                    context: widget.mxcontext,
                    origin: widget.mxform,
                    callback(objs: any) {
                        console.log(objs);
                    },
                    error(error: Error) {
                        (window as any).mx.ui.error("error", error.message);
                    }
                });
            }
        },
        [widget, props.onSelectMicroflow]
    );

    useEffect(() => {
        if (widget) {
            onLoadData({});
        }
    }, [widget]);

    const { run } = useDebounceFn(
        () => {
            onSelect(checkedKeys);
        },
        {
            wait: 500
        }
    );

    const onChange = useCallback(
        (keys: string[]) => {
            setCheckedKeys(keys);
            run();
        },
        [setCheckedKeys, run]
    );

    useWhyDidYouUpdate("Tree", { ...props, restore, cacheMxobject });

    return (
        <div ref={ref}>
            <TreeContainer
                checkedKeys={checkedKeys}
                onChange={onChange}
                loadData={onLoadData}
                treeData={treeData}
            ></TreeContainer>
        </div>
    );
};
