import { ColumnsType } from "antd/lib/table";
import { createElement, ReactNode, useEffect, useMemo } from "react";
import { ValueStatus } from "mendix";

import { TableContainerProps } from "../typings/TableProps";

import TableComponent from "./components/TableComponent";

export default function Table(props: TableContainerProps) {
    console.log(props);

    useEffect(() => {
        props.datasource.requestTotalCount(true);
        props.datasource.setLimit(props.pageSize);
    }, [props.datasource, props.pageSize]);

    const columns: ColumnsType = useMemo(() => {
        return props.columns.map(c => {
            return {
                title: c.header?.value,
                render: (_, record: any, index: number): ReactNode => {
                    return <span>{c.attribute?.get(record).value?.toString()}</span>;
                }
            };
        });
    }, [props.columns]);

    return <TableComponent dataSource={props.datasource.items} columns={columns}></TableComponent>;
}
