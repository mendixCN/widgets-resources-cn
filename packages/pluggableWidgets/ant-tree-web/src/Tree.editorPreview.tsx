import { Component, ReactNode, createElement } from "react";
import { TreePreviewProps } from "../typings/TreeProps";
import { TreeContainer } from "./components/TreeContainer";

declare function require(name: string): string;

export class preview extends Component<TreePreviewProps> {
    render(): ReactNode {
        return (
            <TreeContainer
                defaultExpandedKeys={["0-0"]}
                treeData={[
                    {
                        title: "parent 1",
                        key: "0-0",
                        children: [
                            {
                                title: "parent 1-0",
                                key: "0-0-0",
                                disabled: true,
                                children: [
                                    {
                                        title: "leaf",
                                        key: "0-0-0-0",
                                        disableCheckbox: true
                                    },
                                    {
                                        title: "leaf",
                                        key: "0-0-0-1"
                                    }
                                ]
                            },
                            {
                                title: "parent 1-1",
                                key: "0-0-1",
                                children: [{ title: <span style={{ color: "#1890ff" }}>sss</span>, key: "0-0-1-0" }]
                            }
                        ]
                    },
                    {
                        title: "parent 2",
                        key: "0-1"
                    }
                ]}
            ></TreeContainer>
        );
    }
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
