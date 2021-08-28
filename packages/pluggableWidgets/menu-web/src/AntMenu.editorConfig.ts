import { Problem, Properties, StructurePreviewProps } from "@mendix/piw-utils-internal";

import { AntMenuPreviewProps } from "../typings/AntMenuProps";

export function getProperties(values: AntMenuPreviewProps, defaultProperties: Properties): Properties {
    console.log(values);
    return defaultProperties;
}

export const getPreview = (values: AntMenuPreviewProps): StructurePreviewProps => {
    console.log(values);
    return {
        type: "RowLayout",
        borders: true,
        borderRadius: 5,
        borderWidth: 1,
        columnSize: "grow",
        children: [
            {
                type: "Text",
                content: "AntMenu"
            }
        ]
    };
};
export function check(values: AntMenuPreviewProps): Problem[] {
    console.log(values);

    const errors: Problem[] = [];
    return errors;
}
