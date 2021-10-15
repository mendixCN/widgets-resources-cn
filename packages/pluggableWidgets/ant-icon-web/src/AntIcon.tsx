import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { AntIconContainerProps } from "../typings/AntIconProps";

import "./ui/AntIcon.css";

export default class AntIcon extends Component<AntIconContainerProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText ? this.props.sampleText : "World"} />;
    }
}
