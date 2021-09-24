import React, { useState, useEffect, useRef, createElement, Key } from "react";
import { GridItemKeySelector, VariableSizeGrid as Grid } from "react-window";
import ResizeObserver from "rc-resize-observer";
import classNames from "classnames";
import { Checkbox, Table } from "antd";
import { useSelections, useWhyDidYouUpdate } from "ahooks";

const itemKey: GridItemKeySelector = ({ columnIndex, rowIndex, data }) => {
    return (data[rowIndex] as any).id + ":" + columnIndex;
};

export function VirtualTable(props: Parameters<typeof Table>[0]) {
    // hover
    const [hover, setHover] = useState();
    // selections
    const [items, setItems] = useState<string[]>([]);
    useEffect(() => {
        if (props.dataSource) {
            setItems(props.dataSource.map(d => (d as any).id));
        }
    }, [props.dataSource]);
    const { select, isSelected, selected, setSelected } = useSelections<Key>(items, []);

    let { columns, scroll } = props;
    columns = [
        {
            width: 46,
            render(d, r, i) {
                return <Checkbox></Checkbox>;
            }
        },
        ...(columns as any)
    ];
    const [tableWidth, setTableWidth] = useState(0);

    const widthColumnCount = columns!.filter(({ width }) => !width).length;
    const mergedColumns = columns!.map(column => {
        if (column.width) {
            return column;
        }

        return {
            ...column,
            width: Math.floor(tableWidth / widthColumnCount)
        };
    });

    const gridRef = useRef<any>();
    const [connectObject] = useState<any>(() => {
        const obj = {};
        Object.defineProperty(obj, "scrollLeft", {
            get: () => null,
            set: (scrollLeft: number) => {
                if (gridRef.current) {
                    gridRef.current.scrollTo({ scrollLeft });
                }
            }
        });

        return obj;
    });

    const resetVirtualGrid = () => {
        gridRef.current?.resetAfterIndices({
            columnIndex: 0,
            shouldForceUpdate: true
        });
    };

    useEffect(() => resetVirtualGrid, [tableWidth]);

    const renderVirtualList = (rawData: object[], { scrollbarSize, ref, onScroll }: any) => {
        ref.current = connectObject;
        const totalHeight = rawData.length * 54;

        return (
            <Grid
                ref={gridRef}
                itemData={rawData}
                itemKey={itemKey}
                className="virtual-grid"
                columnCount={mergedColumns.length}
                columnWidth={(index: number) => {
                    const { width } = mergedColumns[index];
                    return totalHeight > scroll!.y! && index === mergedColumns.length - 1
                        ? (width as number) - scrollbarSize - 1
                        : (width as number);
                }}
                height={scroll!.y as number}
                rowCount={rawData.length}
                rowHeight={() => 54}
                width={tableWidth}
                onScroll={({ scrollLeft }: { scrollLeft: number }) => {
                    onScroll({ scrollLeft });
                }}
            >
                {({
                    columnIndex,
                    rowIndex,
                    style
                }: {
                    columnIndex: number;
                    rowIndex: number;
                    style: React.CSSProperties;
                }) => (
                    <div
                        className={classNames("virtual-table-cell", {
                            "virtual-table-cell-last": columnIndex === mergedColumns.length - 1,
                            "virtual-table-row-selected": isSelected((rawData[rowIndex] as any).id)
                        })}
                        style={style}
                        onMouseEnter={() => {
                            select((rawData[rowIndex] as any).id);
                        }}
                    >
                        {(mergedColumns as any)[columnIndex].render(
                            rawData[rowIndex] as any,
                            rawData[rowIndex] as any,
                            rowIndex
                        )}
                    </div>
                )}
            </Grid>
        );
    };

    useWhyDidYouUpdate("VirtualTable", { ...props });

    return (
        <ResizeObserver
            onResize={({ width }) => {
                setTableWidth(width);
            }}
        >
            <Table
                // {...props}
                size={props.size}
                rowKey="id"
                scroll={props.scroll}
                dataSource={props.dataSource}
                className="virtual-table"
                columns={mergedColumns}
                pagination={false}
                rowSelection={{
                    selectedRowKeys: selected,
                    onChange: setSelected,
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE]
                }}
                components={{
                    body: renderVirtualList
                }}
            />
        </ResizeObserver>
    );
}
