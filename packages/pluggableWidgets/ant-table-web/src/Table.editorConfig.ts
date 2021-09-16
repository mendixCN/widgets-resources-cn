import {
    changePropertyIn,
    ContainerProps,
    hidePropertyIn,
    Problem,
    Properties,
    RowLayoutProps,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix-cn/piw-utils-internal";
import { ColumnsPreviewType, TablePreviewProps } from "../typings/TableProps";

export function getProperties(
    values: TablePreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (!values.enablePaging) {
        hidePropertyIn(defaultProperties, values, "pageSize");
    }
    values.columns.forEach((column, index) => {
        if (column.showContentAs !== "dynamicText") {
            hidePropertyIn(defaultProperties, values, "columns", index, "dynamicText");
        }
        if (column.showContentAs !== "customContent") {
            hidePropertyIn(defaultProperties, values, "columns", index, "content");
        }
        if (column.width !== "manual") {
            hidePropertyIn(defaultProperties, values, "columns", index, "size");
        }
    });
    changePropertyIn(
        defaultProperties,
        values,
        prop => {
            prop.objectHeaders = ["Caption", "Content", "Width", "Alignment"];
            prop.objects?.forEach((object, index) => {
                const column = values.columns[index];
                const header = column.header ? column.header : "[Empty caption]";
                const alignment = column.alignment;
                object.captions = [
                    header,
                    column.showContentAs === "attribute"
                        ? column.attribute
                            ? column.attribute
                            : "[No attribute selected]"
                        : column.showContentAs === "dynamicText"
                        ? column.dynamicText
                        : "Custom content",
                    column.width === "autoFill"
                        ? "Auto-fill"
                        : column.width === "autoFit"
                        ? "Auto-fit content"
                        : `Manual (${column.size})`,
                    alignment ? alignment.charAt(0).toUpperCase() + alignment.slice(1) : ""
                ];
            });
        },
        "columns"
    );
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export const getPreview = (values: TablePreviewProps): StructurePreviewProps => {
    const hasColumns = values.columns && values.columns.length > 0;
    const columnProps: ColumnsPreviewType[] = hasColumns
        ? values.columns
        : [
              {
                  header: "Column",
                  attribute: "",
                  width: "autoFit",
                  columnClass: "",
                  filter: { widgetCount: 0, renderer: () => null },
                  resizable: false,
                  showContentAs: "attribute",
                  content: { widgetCount: 0, renderer: () => null },
                  dynamicText: "Dynamic text",
                  draggable: false,
                  hidable: "no",
                  size: 1,
                  sortable: false,
                  alignment: "left"
              }
          ];
    const columns: RowLayoutProps = {
        type: "RowLayout",
        columnSize: "fixed",
        children: columnProps.map(
            column =>
                ({
                    type: "Container",
                    borders: true,
                    grow: column.width === "manual" && column.size ? column.size : 1,
                    backgroundColor: "#F5F5F5",
                    children: [
                        column.showContentAs === "customContent"
                            ? {
                                  type: "DropZone",
                                  property: column.content
                              }
                            : {
                                  type: "Container",
                                  padding: 8,
                                  children: [
                                      {
                                          type: "Text",
                                          content:
                                              column.showContentAs === "dynamicText"
                                                  ? column.dynamicText ?? "Dynamic text"
                                                  : `[${
                                                        column.attribute ? column.attribute : "No attribute selected"
                                                    }]`,
                                          fontSize: 10
                                      }
                                  ]
                              }
                    ]
                } as ContainerProps)
        )
    };
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
                        content: "Ant Table",
                        fontColor: "#2074c8"
                    }
                ]
            }
        ]
    };
    const headers: RowLayoutProps = {
        type: "RowLayout",
        columnSize: "fixed",
        children: columnProps.map(column => {
            const content: ContainerProps = {
                type: "Container",
                borders: true,
                grow:
                    values.columns.length > 0
                        ? column.width === "manual" && column.size
                            ? column.size
                            : 1
                        : undefined,
                backgroundColor: "#DCDCDC",
                children: [
                    {
                        type: "Container",
                        padding: 8,
                        children: [
                            {
                                type: "Text",
                                bold: true,
                                fontSize: 10,
                                content: column.header ? column.header : "Header",
                                fontColor: column.header ? undefined : "#DCDCDC"
                            }
                        ]
                    }
                ]
            };
            return values.columns.length > 0
                ? {
                      type: "Selectable",
                      object: column,
                      grow: column.width === "manual" && column.size ? column.size : 1,
                      child: {
                          type: "Container",
                          children: [content]
                      }
                  }
                : content;
        })
    };

    return {
        type: "Container",
        children: [titleHeader, headers, ...Array.from({ length: 5 }).map(() => columns)]
    };
};

export function check(values: TablePreviewProps): Problem[] {
    const errors: Problem[] = [];
    values.columns.forEach((column: ColumnsPreviewType, index) => {
        if (column.showContentAs === "attribute" && !column.attribute) {
            errors.push({
                property: `columns/${index + 1}/attribute`,
                message: `An attribute is required when 'Show' is set to 'Attribute'. Select the 'Attribute' property for column ${column.header}`
            });
        }
    });

    return errors;
}
