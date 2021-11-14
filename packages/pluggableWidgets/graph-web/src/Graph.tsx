import { createElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./components/Trick";
import { EdgeConfig, Graph as Graph2, NodeConfig, registerEdge, registerNode } from "@antv/g6";
import { ValueStatus } from "mendix";
import { set, template } from "lodash-es";

import { GraphContainerProps, LegendConfigsType } from "../typings/GraphProps";

import "./ui/index.scss";
import classNames from "classnames";
import { useSize } from "ahooks";

registerEdge(
    "singleLineArrow",
    {
        options: {
            style: {
                stroke: "#ccc"
            }
        },
        // afterDraw: function draw(cfg, group) {
        //     group?.removeChild(group?.getFirst(), true);
        //     if (!cfg?.startPoint || !cfg.style || !cfg.endPoint || !group) {
        //         throw new Error("data error");
        //     }
        //     const startPoint = cfg.startPoint;
        //     const endPoint = cfg.endPoint;

        //     const stroke = (cfg.style && cfg.style.stroke) || "#F6BD16";
        //     // const startArrow = (cfg.style && cfg.style.startArrow) || undefined;
        //     const endArrow = (cfg.style && cfg.style.endArrow) || undefined;

        //     const keyShape = group.addShape("path", {
        //         attrs: {
        //             path: [
        //                 ["M", startPoint.x, startPoint.y],
        //                 ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
        //                 ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
        //                 ["L", endPoint.x, endPoint.y]
        //             ],
        //             stroke,
        //             lineWidth: 1,
        //             startArrow: false,
        //             endArrow
        //         },
        //         className: "edge-shape",
        //         name: "edge-shape",
        //         style: cfg.style
        //     });
        //     return keyShape;
        // },
        update: undefined
    },
    "cubic"
);

registerEdge("lineArrow", {
    options: {
        style: {
            stroke: "#ccc"
        }
    },
    draw: function draw(cfg, group) {
        if (!cfg?.startPoint || !cfg.style || !cfg.endPoint || !group) {
            throw new Error("data error");
        }
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;

        const stroke = (cfg.style && cfg.style.stroke) || "#F6BD16";
        const startArrow = (cfg.style && cfg.style.startArrow) || undefined;
        const endArrow = (cfg.style && cfg.style.endArrow) || undefined;

        const keyShape = group.addShape("path", {
            attrs: {
                path: [
                    ["M", startPoint.x, startPoint.y],
                    ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
                    ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
                    ["L", endPoint.x, endPoint.y]
                ],
                stroke,
                lineWidth: 1,
                startArrow,
                endArrow
            },
            className: "edge-shape",
            name: "edge-shape",
            style: cfg.style
        });
        return keyShape;
    }
});

registerEdge(
    "extraShapeEdge",
    {
        afterDraw(cfg, group) {
            // get the first shape in the graphics group of this edge, it is the path of the edge here
            // 获取图形组中的第一个图形，在这里就是边的路径图形
            const shape = group?.get("children")[0];
            // get the coordinate of the mid point on the path
            // 获取路径图形的中点坐标
            const midPoint = shape.getPoint(0.5);
            const rectColor = (cfg?.midPointColor as string) || "#333";
            // add a rect on the mid point of the path. note that the origin of a rect shape is on its lefttop
            // 在中点增加一个矩形，注意矩形的原点在其左上角
            group?.addShape("rect", {
                attrs: {
                    width: 10,
                    height: 10,
                    fill: rectColor || "#333",
                    // x and y should be minus width / 2 and height / 2 respectively to translate the center of the rect to the midPoint
                    // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
                    x: midPoint.x - 5,
                    y: midPoint.y - 5
                }
            });

            // get the coordinate of the quatile on the path
            // 获取路径上的四分位点坐标
            const quatile = shape.getPoint(0.25);
            const quatileColor = (cfg?.quatileColor as string) || "#333";
            // add a circle on the quatile of the path
            // 在四分位点上放置一个圆形
            group?.addShape("circle", {
                attrs: {
                    r: 5,
                    fill: quatileColor || "#333",
                    x: quatile.x,
                    y: quatile.y
                }
            });
        },
        update: undefined
    },
    "cubic"
);

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
            return props.edges.items?.map(item => {
                const cluster = props.edgeLegend?.get(item).value?.toString();
                const styleConfig = props.styleForEdge.find(cfg => cfg.cluster === cluster);
                const style = styleConfig ? JSON.parse(styleConfig.styleString.replaceAll("\r\n", "")) : undefined;
                return {
                    data: item.id.toString(),
                    source: props.From?.get(item).value?.toString(),
                    target: props.To?.get(item).value?.toString(),
                    label: props.labelEdge?.get(item).value?.toString(),
                    cluster: props.edgeLegend?.get(item).value?.toString(),
                    type: props.edgeTypeAttribute
                        ? props.edgeTypeAttribute.get(item).value?.toString()
                        : props.edgeTypeConst,
                    style
                } as EdgeConfig;
            });
        }
        return [];
    }, [graph, props.edges, props.labelEdge]);
    const nodes = useMemo(() => {
        if (graph && props.nodes && props.nodes.status === ValueStatus.Available) {
            return props.nodes.items?.map(item => {
                const dataItem = {
                    id: props._key?.get(item).value?.toString(),
                    data: item.id.toString(),
                    label: props.labelNode?.get(item).value,
                    cluster: props.nodeLegend?.get(item).value?.toString(),
                    type: props.nodeTypeAttribute
                        ? props.nodeTypeAttribute.get(item).value?.toString()
                        : props.nodeTypeConst
                } as NodeConfig;
                props.customNodeAttributes.forEach(cna => {
                    set(dataItem, cna.valueKey, cna.valueAttribute?.get(item).value?.toString());
                });
                return dataItem;
            });
        }
        return [];
    }, [graph, props.nodes, props.labelNode, props._key, props.nodeTypeAttribute]);

    useEffect(() => {
        // registerNode
        props.customNodes.forEach(item => {
            registerNode(item.nodeType, (cfg: any) => template(item.templateString)(cfg));
        });

        if (refContainer.current) {
            const nodes: NodeConfig[] = [];
            const edges: EdgeConfig[] = [];
            const filterFunctions: any = {};
            props.legendConfigs.forEach(item => {
                if (item.legendType === "edge") {
                    edges.push({ id: item.legendName, label: item.label });
                } else {
                    nodes.push({ id: item.legendName, label: item.label });
                }
                filterFunctions[item.legendName] = (d: any) => {
                    if (d.cluster === item.legendName) {
                        return true;
                    }
                    return false;
                };
            });

            const myGraph = new Graph2({
                plugins: [],
                container: refContainer.current,
                // renderer: 'svg',
                layout: {
                    type: "force",
                    center: [200, 200], // 可选，默认为图的中心
                    linkDistance: 400, // 可选，边长
                    preventOverlap: true,
                    nodeStrength: -500, // 可选 节点间引力
                    collideStrength: 0.8, // 可选
                    nodeSize: 300, // 可选
                    alpha: 0.3, // 可选
                    alphaDecay: 0.028, // 可选
                    alphaMin: 0.01, // 可选
                    forceSimulation: null, // 可选
                    onTick: () => {
                        // 可选
                        console.log("ticking");
                    },
                    onLayoutEnd: () => {
                        // 可选
                        console.log("force layout done");
                    }
                },
                defaultNode: {
                    style: {
                        lineWidth: 2,
                        stroke: "#5B8FF9",
                        fill: "#C6E5FF"
                    }
                },
                defaultEdge: {
                    color: "#e2e2e2",
                    style: {
                        stroke: "#F6BD16",
                        startArrow: {
                            path: "M 0,0 L 12,6 L 9,0 L 12,-6 Z",
                            fill: "#F6BD16"
                        },
                        endArrow: {
                            path: "M 0,0 L 12,6 L 9,0 L 12,-6 Z",
                            fill: "#F6BD16"
                        }
                    }
                },
                animate: true,
                // fitView: true,
                // fitCenter: true,
                // fitViewPadding: 10,
                modes: {
                    default: ["drag-canvas", "zoom-canvas", "drag-node"]
                },
                nodeStateStyles: {
                    activeByLegend: {
                        opacity: 1
                    },
                    inactiveByLegend: {
                        opacity: 0.2
                    }
                },
                edgeStateStyles: {
                    activeByLegend: {
                        opacity: 1
                    },
                    inactiveByLegend: {
                        opacity: 0.2
                    }
                }
            });

            setGraph(myGraph);
        }

        return () => {
            graph?.destroy();
        };
    }, []);

    useEffect(() => {
        // @ts-ignore
        graph?.read({
            nodes,
            edges
        });
    }, [graph, nodes, edges]);

    const onHoverLegend = useCallback(
        (cfg: LegendConfigsType, isHover: boolean) => {
            graph?.getEdges().forEach(edge => {
                graph.clearItemStates(edge, ["inactiveByLegend", "activeByLegend"]);
                if (isHover) {
                    if (cfg.legendType === "edge" || cfg.legendType === "all") {
                        graph.setItemState(edge, "activeByLegend", edge.get("model").cluster === cfg.legendName);
                        graph.setItemState(edge, "inactiveByLegend", edge.get("model").cluster !== cfg.legendName);
                    } else {
                        graph.setItemState(edge, "inactiveByLegend", true);
                        graph.setItemState(edge, "activeByLegend", false);
                    }
                } else {
                    edge.refresh();
                }
            });
            graph?.getNodes().forEach(node => {
                graph.clearItemStates(node, ["inactiveByLegend", "activeByLegend"]);
                if (isHover) {
                    if (cfg.legendType === "node" || cfg.legendType === "all") {
                        graph.setItemState(node, "activeByLegend", node.get("model").cluster === cfg.legendName);
                        graph.setItemState(node, "inactiveByLegend", node.get("model").cluster !== cfg.legendName);
                    } else {
                        graph.setItemState(node, "inactiveByLegend", true);
                    }
                }
            });
        },
        [graph]
    );

    return (
        <div style={props.style} tabIndex={props.tabIndex} className={classNames(props.class, "mxcn-graph")}>
            <div className="legend-container">
                {props.legendConfigs.map(cfg => (
                    <div
                        key={cfg.legendName}
                        onMouseLeave={() => {
                            onHoverLegend(cfg, false);
                        }}
                        onMouseEnter={() => {
                            onHoverLegend(cfg, true);
                        }}
                        className="legend-item"
                    >
                        {cfg.content}
                        <span>{cfg.label}</span>
                    </div>
                ))}
            </div>
            <div className="canvas-container" ref={refContainer}></div>
        </div>
    );
}
