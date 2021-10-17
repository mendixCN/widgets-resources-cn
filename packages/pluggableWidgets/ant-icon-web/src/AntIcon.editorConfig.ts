import {
    /*     changePropertyIn,
    Problem,
    Properties,
    Property,
    transformGroupsIntoTabs, */
    RowLayoutProps,
    StructurePreviewProps
} from "@mendix-cn/piw-utils-internal";
import { AntIconPreviewProps } from "../typings/AntIconProps";

/* export function getProperties(
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
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
} */

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
                content: values.buildInIcon
            }
        ]
    };
    return {
        type: "Container",
        children: [titleHeader]
    };
};
/* 
export function check(values: AntIconPreviewProps): Problem[] {
    console.log(values);

    const errors: Problem[] = [];
   

    return errors;
}
 */
