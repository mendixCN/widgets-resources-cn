import { useWhyDidYouUpdate } from "ahooks";
import { Tree } from "antd";
import { DataNode, EventDataNode } from "antd/lib/tree";
import { createElement } from "react";
import "../ui/antd.css";

export interface TreeNode {
    title: string;
    key: string;
    guid: string;
    children: TreeNode[];
}

export interface TreeContainerProps {
    treeData?: DataNode[];
    loadData?: (treeNode: EventDataNode) => Promise<void>;
}

export const TreeContainer = (props: TreeContainerProps) => {
    useWhyDidYouUpdate("TreeContainer", { ...props });

    return <Tree checkable loadData={props.loadData} treeData={props.treeData} />;
};
