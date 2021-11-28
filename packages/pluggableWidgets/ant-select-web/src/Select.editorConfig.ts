import {
    hidePropertiesIn,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix-cn/piw-utils-internal";
import { SelectPreviewProps } from "../typings/SelectProps";

export function getProperties(
    values: SelectPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.isMultiConst === false) {
        hidePropertiesIn(defaultProperties, values, ["selectList", "optionValueM", "onDeselectM"]);
    } else {
        hidePropertiesIn(defaultProperties, values, ["onDeselect"]);
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
export function getPreview(values: SelectPreviewProps): StructurePreviewProps | null {
    return {
        type: "Container",
        backgroundColor: "#B7F0AD",
        borders: true,
        borderWidth: 2,
        borderRadius: 10,
        children: [
            {
                type: "Text",
                content: `Select-${values.isMultiConst ? "多选" : "单选"}`
            },
            {
                type: "Container",
                backgroundColor: "#fff",
                children: [
                    {
                        type: "Text",
                        content: "待选项"
                    },
                    {
                        type: "RowLayout",
                        columnSize: "fixed",
                        borders: true,
                        borderRadius: 2,
                        borderWidth: 2,
                        padding: 2,
                        children: [
                            {
                                type: "Text",
                                content: `值{${values.optionValue}}`
                            },
                            {
                                type: "Text",
                                content: `标签{${values.optionLabel}}`
                            }
                        ]
                    }
                ]
            },
            {
                type: "Container",
                backgroundColor: "#fff",
                children: [
                    {
                        type: "Text",
                        content: "已选项"
                    },
                    {
                        type: "RowLayout",
                        columnSize: "fixed",
                        borders: true,
                        borderRadius: 2,
                        borderWidth: 2,
                        padding: 2,
                        children: values.isMultiConst
                            ? [
                                  {
                                      type: "Text",
                                      content: `已选值{${values.value}}`
                                  },
                                  {
                                      type: "Text",
                                      content: `选项值{${values.optionValueM}}`
                                  }
                              ]
                            : [
                                  {
                                      type: "Text",
                                      content: `已选值{${values.value}}`
                                  }
                              ]
                    }
                ]
            }
        ]
    };
}
