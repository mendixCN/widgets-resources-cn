import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { AffixWebContainerProps } from "../typings/AffixWebProps";

import "./ui/AffixWeb.css";

export default class AffixWeb extends Component<AffixWebContainerProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText ? this.props.sampleText : "World"} />;
    }
}
