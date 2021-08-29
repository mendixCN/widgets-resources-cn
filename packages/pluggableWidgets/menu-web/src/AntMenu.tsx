import { createElement, useCallback } from "react";
import { AntMenuContainer, MenuItemData } from "./components/AntMenuContainer";

import { AntMenuContainerProps } from "../typings/AntMenuProps";

import "./ui/AntMenu.css";
import TreeModel from "tree-model/types";

export const AntMenu = (props: AntMenuContainerProps) => {
    const getChildren = useCallback(
        (node: TreeModel.Node<MenuItemData>) =>
            new Promise<MenuItemData[]>((resolve, reject) => {
                if (node.isRoot()) {
                    (window as any).mx.data.get({
                        xpath: `//${props.entity}[not(${props.refName}/${props.entity})]`,
                        callback(objs: any[]) {
                            resolve(
                                objs.map<MenuItemData>(obj => ({
                                    title: obj.get(props.title),
                                    icon: obj.get(props.iconString),
                                    isFolder: obj.get(props.isFolder),
                                    guid: obj.getGuid()
                                }))
                            );
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
                            resolve(
                                objs.map<MenuItemData>(obj => ({
                                    title: obj.get(props.title),
                                    icon: obj.get(props.iconString),
                                    isFolder: obj.get(props.isFolder),
                                    guid: obj.getGuid()
                                }))
                            );
                        },
                        error(error: Error) {
                            reject(error);
                        }
                    });
                }
            }),
        []
    );

    return <AntMenuContainer onMenuItemClick={props.onMenuItemClick} entity={props.entity} getChildren={getChildren} />;
};
