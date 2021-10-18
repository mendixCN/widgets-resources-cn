import { Properties, StructurePreviewProps, transformGroupsIntoTabs } from "@mendix-cn/piw-utils-internal";
import { AMapContainerProps } from "../typings/AMapProps";
import BarcodeScannerSvg from "./assets/big.svg";

export function getProperties(
    _: AMapContainerProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export function getPreview(): StructurePreviewProps | null {
    return {
        type: "Container",
        children: [
            {
                type: "RowLayout",
                columnSize: "fixed",
                backgroundColor: "#daeffb",
                borders: true,
                borderWidth: 1,
                children: [
                    {
                        type: "Container",
                        padding: 4,
                        children: [
                            {
                                type: "Text",
                                content: "高德地图",
                                fontColor: "#2074c8"
                            }
                        ]
                    }
                ]
            },
            {
                type: "Image",
                document: decodeURIComponent(BarcodeScannerSvg.replace("data:image/svg+xml,", "")),
                height: 275,
                width: 275
            }
        ]
    };
}
