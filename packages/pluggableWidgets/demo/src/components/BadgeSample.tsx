import { Component, ReactNode, createElement } from "react";
import classNames from "classnames";

export interface BadgeSampleProps {
    type: "badge" | "label";
    defaultValue?: string;
    className?: string;
    style?: object;
    value?: string;
    bootstrapStyle?: BootstrapStyle;
    clickable?: boolean;
    onClickAction?: () => void;
    getRef?: (node: HTMLElement) => void;
}

export type BootstrapStyle = "default" | "info" | "inverse" | "primary" | "danger" | "success" | "warning";

export class BadgeSample extends Component<BadgeSampleProps> {
    render(): ReactNode {
        return (
            <span
                className={classNames("widget-demo", this.props.type, this.props.className, {
                    [`label-${this.props.bootstrapStyle}`]: !!this.props.bootstrapStyle,
                    "widget-demo-clickable": this.props.clickable
                })}
                onClick={this.props.onClickAction}
                ref={this.props.getRef}
                style={this.props.style}
            >12
                {this.props.value || this.props.defaultValue}
            </span>
        );
    }
}
