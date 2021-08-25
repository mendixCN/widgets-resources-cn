import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { AntMenuContainerProps } from "../typings/AntMenuProps";

import "./ui/AntMenu.css";

export default class AntMenu extends Component<AntMenuContainerProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText ? this.props.sampleText : "World"} />;
    }
}
