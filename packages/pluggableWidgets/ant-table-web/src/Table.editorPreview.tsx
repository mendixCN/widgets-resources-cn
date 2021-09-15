import { TablePreviewProps } from "../typings/TableProps";
import TableComponent from "./components/TableComponent";
import { Tag, Space } from "antd";
import {
    Component,
    createElement,
    Fragment,
    JSXElementConstructor,
    ReactChild,
    ReactElement,
    ReactFragment,
    ReactNode,
    ReactNodeArray,
    ReactPortal
} from "react";
declare function require(name: string): string;

const data: any[] = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"]
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"]
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"]
    }
];

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined) => <a>{text}</a>
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age"
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address"
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (tags: any[]) => (
            <Fragment>
                {tags.map(tag => {
                    let color = tag.length > 5 ? "geekblue" : "green";
                    if (tag === "loser") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </Fragment>
        )
    },
    {
        title: "Action",
        key: "action",
        render: (
            text: any,
            record: {
                name:
                    | string
                    | number
                    | boolean
                    | {}
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactNodeArray
                    | ReactPortal
                    | null
                    | undefined;
            }
        ) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <textarea>{text}</textarea>
                <a>Delete</a>
            </Space>
        )
    }
];

export class preview extends Component<TablePreviewProps> {
    render(): ReactNode {
        return <TableComponent columns={columns} dataSource={data}></TableComponent>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
