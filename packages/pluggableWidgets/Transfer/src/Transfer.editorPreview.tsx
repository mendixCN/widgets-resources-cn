import { Component, ReactNode, createElement } from "react";
import { TransferContainer } from "./components/TransferContainer";
import { TransferPreviewProps } from "../typings/TransferProps";

declare function require(name: string): string;

export class preview extends Component<TransferPreviewProps> {
    render(): ReactNode {
        return <TransferContainer targetKeys={undefined} onChange={() => { }} isShowSearch={true} data={[]} leftTitle={'Source'} rightTitle={'Target'} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Transfer.css");
}
