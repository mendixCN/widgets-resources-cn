import {
    changePropertyIn,
    Problem,
    Properties,
    Property,
    transformGroupsIntoTabs,
    RowLayoutProps,
    StructurePreviewProps,
    hidePropertyIn,
    hidePropertiesIn
} from "@mendix-cn/piw-utils-internal";
import { AntIconPreviewProps } from "../typings/AntIconProps";

export function getProperties(
    values: AntIconPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    changePropertyIn(
        defaultProperties,
        values,
        (prop: Property) => {
            console.log(prop);
        },
        "buildInIcon"
    );
    if (values.datasourceType === "addon") {
        hidePropertyIn(defaultProperties, values, "buildInIcon");
    } else {
        hidePropertiesIn(defaultProperties, values, ["value", "iconSourceList"]);
    }
    if (values.valueAttribute) {
        hidePropertiesIn(defaultProperties, values, ["value", "buildInIcon"]);
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export const getPreview = (values: AntIconPreviewProps): StructurePreviewProps => {
    console.log(values);

    const titleHeader: RowLayoutProps = {
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
                        content: "Ant Icon",
                        fontColor: "#2074c8"
                    }
                ]
            },
            {
                type: "Text",
                content: values.valueAttribute
                    ? `{{绑定属性 ${values.valueAttribute}}}`
                    : values.datasourceType === "addon"
                    ? values.value
                    : values.buildInIcon
            }
        ]
    };
    return {
        type: "Container",
        children: [titleHeader]
    };
};

export function check(values: AntIconPreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (values.datasourceType === "addon" && !values.valueAttribute && values.value === "") {
        errors.push({
            message: "图标代码不能为空"
        });
    }

    return errors;
}
