import {
    hidePropertiesIn,
    hidePropertyIn,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix-cn/piw-utils-internal";
import { AMapContainerProps, AMapPreviewProps } from "../typings/AMapProps";
import BarcodeScannerSvg from "./assets/big.svg";

export function getProperties(
    values: AMapContainerProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.centerType === "dynamicValue") {
        hidePropertiesIn(defaultProperties, values, ["latCenterStatic", "lngCenterStatic"]);
    } else {
        hidePropertiesIn(defaultProperties, values, ["latCenter", "lngCenter"]);
    }
    if (values.zoomAttribute) {
        hidePropertyIn(defaultProperties, values, "zoomConst");
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export function getPreview(values: AMapPreviewProps): StructurePreviewProps | null {
    let detail = "";
    if (values.enableLocationMode) {
        detail += "坐标拾取模式";
    }
    if (!values.enableAutoFocus) {
        detail += "关闭自动聚焦";
    }
    return {
        type: "Container",
        children: [
            {
                type: "Container",
                backgroundColor: "#daeffb",
                children: [
                    {
                        type: "RowLayout",
                        columnSize: "fixed",
                        padding: 4,
                        borders: true,
                        borderWidth: 1,
                        children: [
                            {
                                type: "Text",
                                content: "高德地图",
                                fontColor: "#2074c8"
                            },
                            {
                                type: "Text",
                                content: detail,
                                fontColor: "#2074c8",
                                grow: 3
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
