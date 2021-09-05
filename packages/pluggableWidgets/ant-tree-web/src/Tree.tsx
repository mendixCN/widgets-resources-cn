import { createElement, useCallback, useEffect, useState, Key, ReactElement } from "react";

import { useWhyDidYouUpdate } from "ahooks";

import { TreeContainerProps } from "../typings/TreeProps";

import "./ui/Tree.css";
import { TreeContainer } from "./components/TreeContainer";
import { DataNode } from "antd/lib/tree";
import useMxWidget from "./useMxWidget";

const _require = window.require as any;

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
    useWhyDidYouUpdate("Tree", { ...props });

    const [treeData, setTreeData] = useState<DataNode[]>([]);

    const [ref, widget] = useMxWidget();

    const onLoadData = useCallback(
        ({ key, children }: any) =>
            new Promise<void>(resolve => {
                if (children) {
                    resolve();
                    return;
                }

                function handleData(objs: any[]): DataNode[] {
                    return objs.map<DataNode>(obj => ({
                        title: obj.get(props.title),
                        isLeaf: obj.get(props.isLeaf),
                        key: obj.getGuid()
                    }));
                }

                if (props.datasourceMicroflow) {
                    _require(["mendix/lib/MxContext", "dojo/global"], (MxContext: any, global: any) => {
                        if (widget) {
                            const context = new MxContext();
                            if (key) {
                                context.setContext(props.entity, key);
                            }

                            global.mx.data.action({
                                params: {
                                    applyto: "none",
                                    actionname: props.datasourceMicroflow
                                    // guids: ["16044073672507393", "16044073672507394", "16044073672507395"],
                                },
                                context,
                                origin: widget.mxform,
                                callback(objs: any[]) {
                                    const dataNodes = handleData(objs);
                                    if (key) {
                                        setTreeData(origin => updateTreeData(origin, key, dataNodes));
                                        resolve();
                                    } else {
                                        setTreeData(dataNodes);
                                    }
                                },
                                error(error: Error) {
                                    global.mx.ui.error("error", error);
                                }
                            });
                        }
                    });
                }
            }),
        [widget, props.datasourceMicroflow, props.entity, props.isLeaf, props.title]
    );

    useEffect(() => {
        _require(["dojo/global"], (global: any) => {
            if (widget) {
                global.mx.data.action({
                    params: {
                        applyto: "selection",
                        actionname: "AntTree.Act_Multiple_Select",
                        guids: ["16044073672507393", "16044073672507394", "16044073672507395"]
                    },
                    origin: widget.mxform,
                    callback(objs: any) {
                        console.log(objs);
                        global.mx.ui.info(`ok with ${objs.length} objs`, false);
                    },
                    error(error: Error) {
                        global.mx.ui.error("error", error);
                    }
                });
            }
        });
        onLoadData({});
    }, [widget, onLoadData]);

    return (
        <div ref={ref}>
            <TreeContainer loadData={onLoadData} treeData={treeData}></TreeContainer>
        </div>
    );
};
