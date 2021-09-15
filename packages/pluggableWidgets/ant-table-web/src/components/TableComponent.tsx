import "../ui/index.scss";
import { Table } from "antd";
import { createElement } from "react";
import { ColumnsType } from "antd/lib/table";

export interface TableComponentProps {
    columns: ColumnsType<any>;
    dataSource?: any[];
}

function TableComponent(props: TableComponentProps) {
    return <Table columns={props.columns} dataSource={props.dataSource} />;
}

export default TableComponent;
