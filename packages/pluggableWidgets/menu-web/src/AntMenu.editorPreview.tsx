import { Component, ReactNode, createElement } from "react";
import { AntMenuContainer } from "./components/AntMenuContainer";
import { AntMenuPreviewProps } from "../typings/AntMenuProps";

declare function require(name: string): string;

export class preview extends Component<AntMenuPreviewProps> {
    render(): ReactNode {
        return (
            <AntMenuContainer
                getChildren={async () => {
                    return [];
                }}
                entity={""}
            />
        );
    }
}

export function getPreviewCss(): string {
    return require("./ui/AntMenu.css");
}
