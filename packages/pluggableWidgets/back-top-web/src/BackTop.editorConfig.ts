import { Properties, StructurePreviewProps, transformGroupsIntoTabs } from "@mendix-cn/piw-utils-internal";
import { BackTopPreviewProps } from "../typings/BackTopProps";

export function getProperties(
    values: BackTopPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    console.log(values);
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
export function getPreview(values: BackTopPreviewProps): StructurePreviewProps | null {
    return {
        type: "Container",
        backgroundColor: "#B7F0AD",
        borders: true,
        borderWidth: 2,
        borderRadius: 10,
        children: [
            {
                type: "Text",
                content: `回到顶部 duration[${values.duration}] visibilityHeight[${values.visibilityHeight}]`
            },
            {
                type: "Container",
                backgroundColor: "#fff",
                children: [
                    {
                        type: "DropZone",
                        placeholder: "UP",
                        property: values.content
                    }
                ]
            }
        ]
    };
}
