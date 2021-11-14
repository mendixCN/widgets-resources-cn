import { Properties, StructurePreviewProps, transformGroupsIntoTabs } from "@mendix-cn/piw-utils-internal";
import { GraphPreviewProps } from "../typings/GraphProps";

export function getProperties(
    values: GraphPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    console.log(values);
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
export function getPreview(values: GraphPreviewProps): StructurePreviewProps | null {
    return {
        type: "Container",
        backgroundColor: "#B7F0AD",
        borders: true,
        borderWidth: 2,
        borderRadius: 10,
        children: [
            {
                type: "Text",
                content: "Graph"
            },
            {
                type: "Container",
                backgroundColor: "#fff",
                children: [
                    {
                        type: "Text",
                        content: "自定义节点"
                    },
                    {
                        type: "RowLayout",
                        columnSize: "fixed",
                        borders: true,
                        borderRadius: 2,
                        borderWidth: 2,
                        padding: 2,
                        children: values.customNodes.map(cn => ({
                            type: "Container",
                            backgroundColor: "#19535F",
                            padding: 2,
                            children: [
                                {
                                    type: "Selectable",
                                    object: cn,
                                    child: {
                                        type: "Container",
                                        children: [{ type: "Text", content: `节点-${cn.nodeType}`, fontColor: "white" }]
                                    }
                                }
                            ]
                        }))
                    },
                    {
                        type: "RowLayout",
                        columnSize: "fixed",
                        borders: true,
                        borderRadius: 5,
                        borderWidth: 2,
                        padding: 2,
                        children: values.customNodeAttributes.map(att => ({
                            type: "Container",
                            backgroundColor: "#E8D33F",
                            padding: 2,
                            children: [
                                {
                                    type: "Selectable",
                                    object: att,
                                    child: {
                                        type: "Container",
                                        children: [
                                            { type: "Text", content: `{{${att.valueKey}}}=>${att.valueAttribute}` }
                                        ]
                                    }
                                }
                            ]
                        }))
                    }
                ]
            },
            {
                type: "Container",
                backgroundColor: "#fff",
                children: [
                    {
                        type: "Text",
                        content: "图例"
                    },
                    {
                        type: "RowLayout",
                        columnSize: "fixed",
                        children: values.legendConfigs.map(legendConfig => ({
                            type: "Container",
                            borders: true,
                            borderRadius: 5,
                            borderWidth: 2,
                            padding: 10,
                            grow: 1,
                            children: [
                                {
                                    type: "DropZone",
                                    property: legendConfig.content,
                                    placeholder: "{{图例图标}}"
                                },
                                {
                                    type: "Selectable",
                                    object: legendConfig,
                                    child: {
                                        type: "Container",
                                        backgroundColor: "#19535F",
                                        children: [
                                            {
                                                type: "Text",
                                                content: `${legendConfig.label}[${legendConfig.legendName}/${legendConfig.legendType}]`,
                                                fontColor: "white"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }))
                    }
                ]
            },
            {
                type: "Container",
                backgroundColor: "#fff",
                children: [
                    {
                        type: "Text",
                        content: "自定义边样式"
                    },
                    {
                        type: "RowLayout",
                        children: values.styleForEdge.map(edgeStyleConfig => ({
                            type: "Container",
                            borders: true,
                            borderRadius: 5,
                            borderWidth: 2,
                            padding: 10,
                            grow: 1,
                            children: [
                                {
                                    type: "Selectable",
                                    object: edgeStyleConfig,
                                    child: {
                                        type: "Container",
                                        backgroundColor: "#19535F",
                                        children: [
                                            {
                                                type: "Text",
                                                content: `cluster[${edgeStyleConfig.cluster}]`,
                                                fontColor: "white"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }))
                    }
                ]
            }
        ]
    };
}
