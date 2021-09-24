import { useWhyDidYouUpdate } from "ahooks";
import { ColumnsType } from "antd/lib/table";
import { createElement, ReactNode, useMemo } from "react";

import { TableContainerProps } from "../typings/TableProps";

import TableWrapper from "./components/TableWrapper";

export default function Table(props: TableContainerProps) {
    /* useEffect(() => {
        props.datasource.requestTotalCount(true);
        if (props.enablePaging) {
            props.datasource.setLimit(props.pageSize);
        }
    }, [props.datasource, props.pageSize, props.enablePaging]); */

    const columns: ColumnsType = useMemo(() => {
        return props.columns.map(c => {
            return {
                title: c.header?.value,
                render: (_, record: any, _2: number): ReactNode => {
                    if (c.showContentAs === "customContent") {
                        return c.content!.get(record);
                    }
                    if (c.showContentAs === "dynamicText") {
                        return c.dynamicText!.get(record).value;
                    }
                    return <span>{c.attribute?.get(record).value?.toString()}</span>;
                }
            };
        });
    }, [props.columns]);

    useWhyDidYouUpdate(`Table[${props.name}]`, { ...props });

    return (
        <TableWrapper
            name={props.name}
            fillContainer={props.fillContainer}
            size={props.size}
            style={props.style}
            enablePaging={props.enablePaging}
            dataSource={props.datasource.items}
            columns={columns}
        ></TableWrapper>
    );
}
