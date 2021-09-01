import { createElement, useState, useEffect, useMemo, useCallback } from "react";
import "../ui/antd.css";
import "../ui/AntMenu.css";

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
    entity: string;
    onMenuItemClick?: (guid: string) => void;
    mode?: "vertical" | "horizontal" | "inline";
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
    const nodeMap = useMemo(() => new Map<string, TreeModel.Node<MenuItemData>>(), []);
    const loadSet = useMemo(() => new Set<string>(), []);
    const treeModel = useMemo(() => new TreeModel(), []);
    const [rootNode, setRootNode] = useState({
        data: treeModel.parse<MenuItemData>({ isFolder: true, title: "", icon: "", guid: "", children: [] })
    });
    const { run, loading, data, params } = useRequest(props.getChildren, {
        manual: true,
        loadingDelay: 600,
        cacheTime: 0
    });

    useEffect(() => {
        if (data) {
            const [parentNode] = params;
            loadSet.add(parentNode.model.guid);

            data?.forEach(item => {
                const node = parentNode.addChild(treeModel.parse(item));
                nodeMap.set(node.model.guid, node);
            });
            if (data.length > 0) {
                setRootNode({ data: rootNode.data });
            }
        }
    }, [data]);

    useEffect(() => {
        run(rootNode.data);
    }, []);

    const renderChildMenu = useCallback((parentNode: TreeModel.Node<MenuItemData>, loading: boolean, currentNode) => {
        if (parentNode === currentNode && loading) {
            return <Skeleton active></Skeleton>;
        }

        return parentNode.children.map((node: TreeModel.Node<MenuItemData>) => {
            return node.model.isFolder ? (
                <SubMenu key={node.model.guid} title={node.model.title} icon={<IconFont type={node.model.icon} />}>
                    {node === currentNode && loading ? (
                        <Skeleton active></Skeleton>
                    ) : (
                        renderChildMenu(node, loading, currentNode)
                    )}
                </SubMenu>
            ) : (
                <Menu.Item icon={<IconFont type={node.model.icon} />} key={node.model.guid}>
                    {node.model.title}
                </Menu.Item>
            );
        });
    }, []);

    const onClick = useCallback(
        (guid: string) => {
            if (props.onMenuItemClick) {
                props.onMenuItemClick(guid);
            }
        },
        [props.onMenuItemClick]
    );

    return (
        <Menu
            onOpenChange={keys => {
                if (keys.length > 0) {
                    const node = nodeMap.get(keys[keys.length - 1].toString());
                    if (node && !loadSet.has(node.model.guid)) {
                        run(node);
                    }
                }
            }}
            onSelect={e => {
                console.log(e);
            }}
            mode={props.mode || "inline"}
            onClick={info => {
                onClick(nodeMap.get(info.key)!.model.guid);
            }}
        >
            {renderChildMenu(rootNode.data, loading, params[0])}
        </Menu>
    );
};
