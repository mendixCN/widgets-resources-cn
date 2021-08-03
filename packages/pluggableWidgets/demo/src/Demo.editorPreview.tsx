import { Component, ReactNode, createElement } from "react";

import { parseInlineStyle } from "@mendix/pluggable-widgets-tools";

import { BadgeSample, BadgeSampleProps } from "./components/BadgeSample";
import { DemoPreviewProps } from "../typings/DemoProps";

declare function require(name: string): string;

export class preview extends Component<DemoPreviewProps> {
    render(): ReactNode {
        return (
            <div ref={this.parentInline}>
                <BadgeSample {...this.transformProps(this.props)}></BadgeSample>
            </div>
        );
    }

    private parentInline(node?: HTMLElement | null): void {
        // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
        if (node && node.parentElement && node.parentElement.parentElement) {
            node.parentElement.parentElement.style.display = "inline-block";
        }
    }

    private transformProps(props: DemoPreviewProps): BadgeSampleProps {
        return {
            type: props.demoType,
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            clickable: false,
            style: parseInlineStyle(props.style),
            defaultValue: props.demoValue ? props.demoValue : "",
            value: props.valueAttribute
        };
    }
}

export function getPreviewCss(): string {
    return require("./ui/Demo.css");
}
