import { Table } from "antd";
import { createElement } from "react";
import { ColumnsType } from "antd/lib/table";
import { useWhyDidYouUpdate } from "ahooks";

export interface TableComponentProps {
    columns: ColumnsType<any>;
    dataSource?: any[];
}

function TableComponent(props: TableComponentProps) {
    useWhyDidYouUpdate("TableComponent", { ...props });
    return <Table rowKey="id" columns={props.columns} dataSource={props.dataSource} />;
}

export default TableComponent;
