import {
    hidePropertiesIn,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix-cn/piw-utils-internal";
import { DatePickerPreviewProps } from "../typings/DatePickerProps";

export function getProperties(
    values: DatePickerPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.mode === "date") {
        hidePropertiesIn(defaultProperties, values, ["valueFrom", "valueTo"]);
    } else {
        hidePropertiesIn(defaultProperties, values, ["value"]);
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
export function getPreview(values: DatePickerPreviewProps): StructurePreviewProps | null {
    console.log(values);
    return null;
}
