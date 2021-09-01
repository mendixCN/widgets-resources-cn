import { createElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./components/Trick";
import { Graph as Graph2 } from "@antv/x6";
import { ValueStatus } from "mendix";
import { executeAction, debounce } from "@mendix/piw-utils-internal";

import { GraphContainerProps } from "../typings/GraphProps";

import "./ui/Graph.css";
import { Big } from "big.js";

export default function Graph(props: GraphContainerProps) {
    const refContainer = useRef<HTMLDivElement>(null);
    const [graph, setGraph] = useState<Graph2>();

    const nodes = useMemo(() => {
        if (graph && props.datasource && props.datasource.status === ValueStatus.Available) {
            return props.datasource.items?.map(item => ({
                data: item.id.toString(),
                label: props.label.get(item).value!,
                x: props.x.get(item).value?.toNumber(),
                y: props.y.get(item).value?.toNumber(),
                width: props.width.get(item).value?.toNumber(),
                height: props.height.get(item).value?.toNumber()
            }));
        }
    }, [props.datasource, props.label, props.x, props.y, props.width, props.height]);

    useEffect(() => {
        if (refContainer.current) {
            if (graph && !graph.disposed) {
                graph.dispose();
            }
            if (props.isEditable) {
                if (props.isEditable.status === ValueStatus.Available) {
                    const myGraph = new Graph2({
                        container: refContainer.current,
                        grid: { visible: false },
                        background: { color: "#f0f0f0" },
                        resizing: {
                            enabled: props.isEditable.value!
                        }
                    });

                    setGraph(myGraph);
                }
            } else {
                const myGraph = new Graph2({
                    container: refContainer.current,
                    grid: { visible: false },
                    background: { color: "#f0f0f0" }
                });

                setGraph(myGraph);
            }
        }
    }, [refContainer, props.isEditable]);

    const onChange = useCallback(
        debounce(({ /* e, x, y,  */ node /* , view */ }) => {
            console.log(node, "xx");

            if (
                props.onChange &&
                props.label &&
                props.xSelected &&
                props.ySelected &&
                props.widthSelected &&
                props.heightSelected &&
                props.datasource.status === ValueStatus.Available
            ) {
                const idx = node.data;
                const objectItem = props.datasource.items![idx];
                const { x, y } = node.getPosition();
                const { width, height } = node.getSize();
                props.xSelected.setValue(Big(x).round(7));
                props.ySelected.setValue(Big(y).round(7));
                props.widthSelected.setValue(Big(width).round(7));
                props.heightSelected.setValue(Big(height).round(7));

                executeAction(props.onChange?.get(objectItem));
            }
        }, 500),
        [
            props.datasource,
            props.onChange,
            props.label,
            props.xSelected,
            props.ySelected,
            props.widthSelected,
            props.heightSelected
        ]
    );

    useEffect(() => {
        if (graph && props.datasource.status === ValueStatus.Available) {
            if (props.onSelect) {
                graph.on("node:dblclick", ({ e, x, y, node, view }) => {
                    console.log(e, x, y, node, view);

                    const idx = node.data;
                    const item = props.datasource.items![idx];
                    executeAction(props.onSelect!.get(item));
                });
            }
            if (props.isEditable?.value && props.onChange) {
                graph.on("node:moved", onChange);
                graph.on("node:resized", onChange);
            }
        }
    }, [graph, props.datasource]);

    // graph.on('node:click', ({ e, x, y, node, view }) => { })
    // { e: JQuery.MouseUpEvent; x: number; y: number; node: Node; view: NodeView }
    // node:resized node:moved
    // graph.on('node:moved', ({ e, x, y, node, view }) => { })
    // graph.on('node:resized', ({ e, x, y, node, view }) => { })

    useEffect(() => {
        if (props.bg && props.bg.status === ValueStatus.Available) {
            console.log(props.bg.value.uri);
            graph?.drawBackground({ image: props.bg.value.uri, size: "contain" });
        }
    }, [graph, props.bg]);

    useEffect(() => {
        graph?.getNodes().forEach(node => graph.removeNode(node));
        nodes?.forEach((node, idx) => {
            graph?.addNode({
                label: node.label,
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                data: idx
            });
        });
    }, [graph, nodes]);

    return <div className="app-content" ref={refContainer} />;
}
