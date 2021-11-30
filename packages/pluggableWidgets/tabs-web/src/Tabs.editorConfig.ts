import {
    hideNestedPropertiesIn,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix-cn/piw-utils-internal";
import { TabsPreviewProps } from "../typings/TabsProps";

export function getProperties(
    values: TabsPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    values.tabs.forEach((_, i) => {
        if (values.customHeader) {
            hideNestedPropertiesIn(defaultProperties, values, "tabs", i, ["caption"]);
        } else {
            hideNestedPropertiesIn(defaultProperties, values, "tabs", i, ["headContent"]);
        }
    });

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
export function getPreview(values: TabsPreviewProps): StructurePreviewProps | null {
    const tabs: StructurePreviewProps[] = values.tabs.map(
        tab =>
            ({
                type: "Container",
                backgroundColor: "#fff",
                padding: 2,
                children: [
                    {
                        type: "RowLayout",
                        borders: true,
                        borderWidth: 2,
                        padding: 2,
                        children: [
                            values.customHeader
                                ? {
                                      type: "DropZone",
                                      property: tab.headContent,
                                      placeholder: "自定义头"
                                  }
                                : {
                                      type: "Text",
                                      content: tab.caption
                                  },
                            {
                                type: "Container",
                                backgroundColor: "#f8edeb",
                                children: [
                                    {
                                        type: "DropZone",
                                        property: tab.content,
                                        placeholder: "Tab body"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            } as StructurePreviewProps)
    );

    return {
        type: "Container",
        backgroundColor: "#B7F0AD",
        borders: true,
        borderWidth: 2,
        borderRadius: 10,
        children: [
            {
                type: "Text",
                content: ` Tabs-${values.tabPosition === "top" ? "顶部" : "左侧"}`
            },
            ...tabs
        ]
    };
}
