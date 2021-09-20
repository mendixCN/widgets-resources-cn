import { createElement } from "react";
import TableComponent, { TableComponentProps } from "./TableComponent";
import { VirtualTable } from "./VirtualTable";

import "../ui/index.scss";

export interface TableWrapperProps extends TableComponentProps {
    enablePaging?: boolean;
}
export default function TableWrapper(props: TableWrapperProps) {
    return (
        <div className="ant-table-web">
            {props.enablePaging ? (
                <TableComponent dataSource={props.dataSource} columns={props.columns}></TableComponent>
            ) : (
                <VirtualTable
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
