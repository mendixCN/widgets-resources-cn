import {
    hidePropertiesIn,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix-cn/piw-utils-internal";
import { AnchorPreviewProps } from "../typings/AnchorProps";

export function getProperties(
    values: AnchorPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    console.log(values);
    if (values.anchorMode === "toc") {
        hidePropertiesIn(defaultProperties, values, ["caption"]);
    } else {
        hidePropertiesIn(defaultProperties, values, ["links"]);
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
export function getPreview(values: AnchorPreviewProps): StructurePreviewProps | null {
    return {
        type: "Container",
        backgroundColor: "#B7F0AD",
        borders: true,
        borderWidth: 2,
        borderRadius: 10,
        children: [
            {
                type: "Text",
                content: values.anchorMode === "toc" ? "Anchor" : `Anchor-${values.caption}`
            },
            {
                type: "Container",
                backgroundColor: "#fff",
                children: values.links.map(link => ({
                    type: "Container",
                    backgroundColor: "#19535F",
                    padding: 2,
                    children: [
                        {
                            type: "Selectable",
                            object: link,
                            child: {
                                type: "Container",
                                children: [{ type: "Text", content: `${link.title}`, fontColor: "white" }]
                            }
                        }
                    ]
                }))
            }
        ]
    };
}
