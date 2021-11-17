import {
    hidePropertiesIn,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix-cn/piw-utils-internal";
import { AffixWebPreviewProps } from "../typings/AffixWebProps";

export function getProperties(
    values: AffixWebPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.stickPosition === "bottom") {
        hidePropertiesIn(defaultProperties, values, ["offsetTop"]);
    } else {
        hidePropertiesIn(defaultProperties, values, ["offsetBottom"]);
    }

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
export function getPreview(values: AffixWebPreviewProps): StructurePreviewProps | null {
    console.log(values);
    return null;
}
