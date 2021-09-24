import { Table } from "antd";
import { createElement } from "react";
import { ColumnsType } from "antd/lib/table";
import { useSelections, useWhyDidYouUpdate } from "ahooks";
import { SizeType } from "antd/lib/config-provider/SizeContext";

export interface TableComponentProps {
    scroll:
        | ({ x?: string | number | true | undefined; y?: string | number | undefined } & {
              scrollToFirstRowOnChange?: boolean | undefined;
          })
        | undefined;
    columns: ColumnsType<any>;
    dataSource?: any[];
    size: SizeType;
    name: string;
}
function TableComponent(props: TableComponentProps) {
    const { selected, setSelected } = useSelections<any>(
        ["16888498602639361", "16888498602639362"],
        ["16888498602639362"]
    );

    useWhyDidYouUpdate(`TableComponent[${props.name}]`, { ...props });
    return (
        <Table
            sticky
            scroll={props.scroll}
            size={props.size}
            rowSelection={{
                selectedRowKeys: selected,
                onChange: setSelected,
                selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE]
            }}
            rowKey="id"
            columns={props.columns}
            dataSource={props.dataSource}
        />
    );
}

export default TableComponent;
