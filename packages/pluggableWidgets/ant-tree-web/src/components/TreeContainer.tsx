import { useControllableValue, useWhyDidYouUpdate } from "ahooks";
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
    checkedKeys?: string[];
    onChange?: (keys: string[]) => void;
}

export const TreeContainer = (props: TreeContainerProps): ReactElement => {
    const [checkedKeys, setCheckedKeys] = useControllableValue(props, {
        valuePropName: "checkedKeys",
        trigger: "onChange"
    });
    useWhyDidYouUpdate("TreeContainer", { ...props });

    return (
        <Tree
            checkedKeys={checkedKeys}
            onCheck={(checked, info) => {
                console.dir(checked, info);
                setCheckedKeys(checked);
            }}
            checkable
            loadData={props.loadData}
            treeData={props.treeData}
        />
    );
};
