import { useWhyDidYouUpdate } from "ahooks";
import { Tree } from "antd";
import { DataNode, EventDataNode } from "antd/lib/tree";
import { createElement, ReactElement } from "react";
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

export const TreeContainer = (props: TreeContainerProps): ReactElement => {
    useWhyDidYouUpdate("TreeContainer", { ...props });

    return (
        <Tree
            checkedKeys={["16044073672507393", "16044073672507394", "16044073672507395"]}
            checkable
            loadData={props.loadData}
            treeData={props.treeData}
        />
    );
};
