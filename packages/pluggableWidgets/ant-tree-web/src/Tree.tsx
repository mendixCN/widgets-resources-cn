import { createElement, useCallback, useEffect, useState } from "react";

import { useWhyDidYouUpdate } from "ahooks";

import { TreeContainerProps } from "../typings/TreeProps";

import "./ui/Tree.css";
import { TreeContainer } from "./components/TreeContainer";
import { DataNode } from "antd/lib/tree";

// It's just a simple demo. You can use tree map to optimize update perf.
function updateTreeData(list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] {
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

export const Tree = (props: TreeContainerProps) => {
    useWhyDidYouUpdate("Tree", { ...props });

    const [treeData, setTreeData] = useState<DataNode[]>([]);

    const onLoadData = useCallback(
        ({ key, children }: any) =>
            new Promise<void>(resolve => {
                if (children) {
                    resolve();
                    return;
                }

                function handleData(objs: any[]) {
                    return objs.map<DataNode>(obj => ({
                        title: obj.get(props.title),
                        isLeaf: obj.get(props.isLeaf),
                        key: obj.getGuid()
                    }));
                }

                if (props.datasourceMicroflow) {
                    // @ts-ignore
                    window.require(["mendix/lib/MxContext"], MxContext => {
                        const context = new MxContext();
                        if (key) context.setContext(props.entity, key);

                        // @ts-ignore
                        window.mx.ui.action(props.datasourceMicroflow, {
                            context,
                            // @ts-ignore
                            callback(objs) {
                                const dataNodes = handleData(objs);
                                if (key) {
                                    setTreeData(origin => updateTreeData(origin, key, dataNodes));
                                    resolve();
                                } else {
                                    setTreeData(dataNodes);
                                }
                            }
                        });
                    });
                }
            }),
        []
    );

    useEffect(() => {
        onLoadData({});
    }, []);

    return <TreeContainer loadData={onLoadData} treeData={treeData}></TreeContainer>;
};
