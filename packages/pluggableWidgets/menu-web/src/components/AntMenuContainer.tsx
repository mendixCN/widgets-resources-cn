import { createElement, useState, Key, useEffect, useMemo, useCallback } from "react";
import "../ui/antd.css";

import { Menu, Skeleton } from "antd";
import TreeModel from "tree-model";
import { useRequest } from "ahooks";
import { createFromIconfontCN } from "@ant-design/icons";

const { SubMenu } = Menu;
const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
});

export interface AntMenuContainerProps {
    getChildren: (node: TreeModel.Node<MenuItemData>) => Promise<MenuItemData[]>;
}

export interface MenuItemData {
    isFolder: boolean;
    title: string;
    icon: string;
    /**
     * mendix object guid
     */
    guid: string;
}

export const AntMenuContainer = (props: AntMenuContainerProps) => {
    const treeModel = useMemo(() => new TreeModel(), []);
    const [rootNode, setRootNode] = useState({
        data: treeModel.parse<MenuItemData>({ isFolder: true, title: "", icon: "", guid: "", children: [] })
    });
    const { run, loading, data, params } = useRequest(props.getChildren, {
        manual: true
    });
    const [openKeys, setOpenKeys] = useState<Key[]>();

    useEffect(() => {
        if (data) {
            const [parentNode] = params;
            data?.forEach(item => {
                parentNode.addChild(treeModel.parse(item));
            });
            if (parentNode.children.length > 0) {
                setRootNode({ data: rootNode.data });
            }
        }
    }, [data, params]);

    useEffect(() => {
        run(rootNode.data);
    }, []);

    const renderChildMenu = useCallback((parentNode: TreeModel.Node<MenuItemData>, loading: boolean, currentNode) => {
        if (parentNode === currentNode && loading) {
            return <Skeleton active></Skeleton>;
        }

        return parentNode.children.map(node => {
            return node.model.isFolder ? (
                <SubMenu key={node.model.guid} title={node.model.title} icon={<IconFont type="icon-tuichu" />}>
                    {node === currentNode && loading ? (
                        <Skeleton active></Skeleton>
                    ) : (
                        renderChildMenu(node, loading, currentNode)
                    )}
                </SubMenu>
            ) : (
                <Menu.Item icon={<IconFont type="icon-tuichu" />} key={node.model.guid}>
                    {node.model.title}
                </Menu.Item>
            );
        });
    }, []);

    return (
        <Menu
            onOpenChange={keys => {
                run(rootNode.data.children[0]);
                setOpenKeys(keys);
            }}
            onSelect={e => {
                console.log(e);
            }}
            style={{ width: 256 }}
            mode={"inline"}
            onClick={info => {
                console.log(info, openKeys);
            }}
        >
            {renderChildMenu(rootNode.data, loading, params[0])}
        </Menu>
    );
};
