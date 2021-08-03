import { Component, ReactNode, createElement } from "react";

import { DemoContainerProps } from "../typings/DemoProps";
import { BadgeSample } from "./components/BadgeSample";
import "./ui/Demo.css";

export default class Demo extends Component<DemoContainerProps> {
    private readonly onClickHandler = this.onClick.bind(this);

    render(): ReactNode {
        return (
            <BadgeSample
                type={this.props.demoType}
                bootstrapStyle={this.props.bootstrapStyle}
                className={this.props.class}
                clickable={!!this.props.onClickAction}
                defaultValue={this.props.demoValue ? this.props.demoValue : ""}
                onClickAction={this.onClickHandler}
                style={this.props.style}
                value={this.props.valueAttribute ? this.props.valueAttribute.displayValue : ""}
            ></BadgeSample>
        );
    }

    private onClick(): void {
        if (this.props.onClickAction && this.props.onClickAction.canExecute) {
            this.props.onClickAction.execute();
        }
    }
}
