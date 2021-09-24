import { createElement, CSSProperties, useMemo, useRef } from "react";
import TableComponent, { TableComponentProps } from "./TableComponent";
import { VirtualTable } from "./VirtualTable";

import "../ui/index.scss";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { useSize } from "ahooks";

export interface TableWrapperProps extends Omit<TableComponentProps, "scroll"> {
    name: string;
    fillContainer: boolean;
    enablePaging?: boolean;
    size: SizeType;
    style?: CSSProperties;
}
const LARGE_SIZE = 55 + 32 + 16 + 16;
const MIDDLE_SIZE = 47 + 32 + 16 + 16;
const SMALL_SIZE = 39 + 24 + 16 + 16;
export default function TableWrapper(props: TableWrapperProps) {
    const ref = useRef<any>();
    const size = props.fillContainer ? useSize(ref) : undefined;
    const scroll = useMemo(
        () => {
            if (props.fillContainer && size) {
                return {
                    y: size.height
                        ? size.height -
                          (props.size === "large" ? LARGE_SIZE : props.size === "small" ? SMALL_SIZE : MIDDLE_SIZE)
                        : undefined
                };
            }
        },
        size ? [size] : []
    );

    return (
        <div ref={ref} className="ant-table-web" style={props.style}>
            {props.enablePaging ? (
                <TableComponent
                    name={props.name}
                    scroll={scroll}
                    size={props.size}
                    dataSource={props.dataSource}
                    columns={props.columns}
                ></TableComponent>
            ) : (
                <VirtualTable
                    size={props.size}
                    columns={props.columns}
                    dataSource={props.dataSource}
                    scroll={{
                        y: 300,
                        x: "100vw"
                    }}
                ></VirtualTable>
            )}
        </div>
    );
}
