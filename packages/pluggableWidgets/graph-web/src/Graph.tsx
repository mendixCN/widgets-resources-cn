import { createElement, useEffect, useMemo, useRef, useState } from "react";
import "./components/Trick";
import { EdgeConfig, Graph as Graph2, NodeConfig } from "@antv/g6";
import { ValueStatus } from "mendix";

import { GraphContainerProps } from "../typings/GraphProps";

import "./ui/index.scss";
import classNames from "classnames";
import { useSize } from "ahooks";

export default function Graph(props: GraphContainerProps) {
    const refContainer = useRef<HTMLDivElement>(null);
    const size = useSize(refContainer);
    const [graph, setGraph] = useState<Graph2>();

    useEffect(() => {
        if (size.width && size.height) {
            graph?.changeSize(size.width, size.height);
            graph?.fitView(10);
        }
    }, [size, graph]);

    const edges = useMemo(() => {
        if (graph && props.edges && props.edges.status === ValueStatus.Available) {
            return props.edges.items?.map(
                item =>
                    ({
                        data: item.id.toString(),
                        source: props.From?.get(item).value?.toString(),
                        target: props.To?.get(item).value?.toString(),
                        label: props.labelEdge?.get(item).value?.toString()
                    } as EdgeConfig)
            );
        }
        return [];
    }, [graph, props.edges, props.labelEdge]);
    const nodes = useMemo(() => {
        if (graph && props.nodes && props.nodes.status === ValueStatus.Available) {
            return props.nodes.items?.map(
                item =>
                    ({
                        id: props._key?.get(item).value?.toString(),
                        data: item.id.toString(),
                        label: props.labelNode?.get(item).value,
                        width: 100,
                        height: 100
                    } as NodeConfig)
            );
        }
        return [];
    }, [graph, props.nodes, props.labelNode, props._key]);

    useEffect(() => {
        if (refContainer.current) {
            const myGraph = new Graph2({
                container: refContainer.current,
                layout: {
                    type: "gForce",
                    center: [200, 200], // 可选，默认为图的中心
                    linkDistance: 50, // 可选，边长
                    nodeStrength: 30, // 可选
                    edgeStrength: 0.1, // 可选
                    nodeSize: 30, // 可选
                    onTick: () => {
                        // 可选
                        console.log("ticking");
                    },
                    onLayoutEnd: () => {
                        // 可选
                        console.log("force layout done");
                    },
                    workerEnabled: true, // 可选，开启 web-worker
                    gpuEnabled: true // 可选，开启 GPU 并行计算，G6 4.0 支持
                },
                defaultNode: {
                    size: 30,
                    style: {
                        lineWidth: 2,
                        stroke: "#5B8FF9",
                        fill: "#C6E5FF"
                    }
                },
                defaultEdge: {
                    size: 1,
                    color: "#e2e2e2",
                    style: {
                        endArrow: {
                            path: "M 0,0 L 8,4 L 8,-4 Z",
                            fill: "#e2e2e2"
                        }
                    }
                },
                animate: true,
                // fitView: true,
                // fitCenter: true,
                // fitViewPadding: 10,
                modes: {
                    default: ["drag-canvas", "zoom-canvas", "drag-node"]
                }
            });

            setGraph(myGraph);
        }

        return () => {
            graph?.destroy();
        };
    }, []);
    /*
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
    */

    // graph.on('node:click', ({ e, x, y, node, view }) => { })
    // { e: JQuery.MouseUpEvent; x: number; y: number; node: Node; view: NodeView }
    // node:resized node:moved
    // graph.on('node:moved', ({ e, x, y, node, view }) => { })
    // graph.on('node:resized', ({ e, x, y, node, view }) => { })

    /*
    useEffect(() => {
        if (props.bg && props.bg.status === ValueStatus.Available) {
            console.log(props.bg.value.uri);
            graph?.drawBackground({ image: props.bg.value.uri, size: "contain" });
        }
    }, [graph, props.bg]);
    */

    useEffect(() => {
        // @ts-ignore
        graph?.read({
            nodes,
            edges
        });
    }, [graph, nodes, edges]);

    return (
        <div
            style={props.style}
            tabIndex={props.tabIndex}
            className={classNames(props.class, "mxcn-graph")}
            ref={refContainer}
        />
    );
}
