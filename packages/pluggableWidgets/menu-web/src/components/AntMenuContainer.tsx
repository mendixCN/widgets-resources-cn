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
    entity: string;
    onMenuItemClick: string;
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
    const [openKeys, setOpenKeys] = useState<Key[]>();

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

        return parentNode.children.map(node => {
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

    const onClick = useCallback((guid: string) => {
        // @ts-ignore
        window.require(["mendix/lib/MxContext"], MxContext => {
            const context = new MxContext();
            context.setContext(props.entity, guid);

            // @ts-ignore
            window.mx.ui.action(props.onMenuItemClick, {
                context,
                progress: "modal",
                // @ts-ignore
                callback(result) {
                    console.log("Engine started: " + result);
                }
            });
        });
    }, []);

    return (
        <Menu
            onOpenChange={keys => {
                if (keys.length > 0) {
                    const node = nodeMap.get(keys[keys.length - 1].toString());
                    if (node && !loadSet.has(node.model.guid)) {
                        run(node);
                    }
                }
                setOpenKeys(keys);
            }}
            onSelect={e => {
                console.log(e);
            }}
            style={{ width: 256 }}
            mode={"inline"}
            onClick={info => {
                onClick(nodeMap.get(info.key)!.model.guid);
            }}
        >
            {renderChildMenu(rootNode.data, loading, params[0])}
        </Menu>
    );
};
