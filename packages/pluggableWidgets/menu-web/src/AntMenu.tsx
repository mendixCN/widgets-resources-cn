import { createElement, useCallback } from "react";
import { AntMenuContainer, MenuItemData } from "./components/AntMenuContainer";

import { AntMenuContainerProps } from "../typings/AntMenuProps";

import "./ui/AntMenu.css";
import TreeModel from "tree-model/types";

export const AntMenu = (props: AntMenuContainerProps) => {
    const getChildren = useCallback(
        (node: TreeModel.Node<MenuItemData>) =>
            new Promise<MenuItemData[]>((resolve, reject) => {
                function handleData(objs: any[]) {
                    return objs.map<MenuItemData>(obj => ({
                        title: obj.get(props.title),
                        icon: obj.get(props.iconString),
                        isFolder: obj.get(props.isFolder),
                        guid: obj.getGuid()
                    }));
                }
                if (props.datasourceMicroflow) {
                    // @ts-ignore
                    window.require(["mendix/lib/MxContext"], MxContext => {
                        const context = new MxContext();
                        if (!node.isRoot()) {
                            context.setContext(props.entity, node.model.guid);
                        }

                        // @ts-ignore
                        window.mx.ui.action(props.datasourceMicroflow, {
                            context,
                            // @ts-ignore
                            callback(objs) {
                                resolve(handleData(objs));
                            }
                        });
                    });

                    return;
                }

                if (node.isRoot()) {
                    (window as any).mx.data.get({
                        xpath: `//${props.entity}[not(${props.refName}/${props.entity})]`,
                        callback(objs: any[]) {
                            resolve(handleData(objs));
                        },
                        error(error: Error) {
                            reject(error);
                        }
                    });
                } else {
                    (window as any).mx.data.get({
                        guid: node.model.guid,
                        path: props.refName,
                        callback(objs: any[]) {
                            console.log("Received " + objs.length + " MxObjects");
                            resolve(handleData(objs));
                        },
                        error(error: Error) {
                            reject(error);
                        }
                    });
                }
            }),
        []
    );

    const onClick = useCallback(
        (guid: string) => {
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
        },
        [props.onMenuItemClick]
    );

    return (
        <AntMenuContainer
            mode={props.menuMode}
            onMenuItemClick={onClick}
            entity={props.entity}
            getChildren={getChildren}
        />
    );
};
