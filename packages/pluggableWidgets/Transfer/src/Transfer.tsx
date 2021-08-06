import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { TransferContainerProps } from "../typings/TransferProps";

import "./ui/index.css";
import "./ui/Transfer.css";

export default class Transfer extends Component<TransferContainerProps> {
    render(): ReactNode {
        return <HelloWorldSample isDisabled={this.props.isDisable} />;
    }
}
