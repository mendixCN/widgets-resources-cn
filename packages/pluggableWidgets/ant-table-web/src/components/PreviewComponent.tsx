import { Tag, Space } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { createElement, Fragment } from "react";
import TableWrapper from "./TableWrapper";

const data: any[] = [
    {
        id: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"]
    },
    {
        id: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"]
    },
    {
        id: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"]
    }
];

const columns = [
    {
        title: "Name",
        key: "name",
        render: (data: any) => <span>{data.name}</span>
    },
    {
        title: "Age",
        key: "age",
        render: (data: any) => <span>{data.age}</span>
    },
    {
        title: "Address",
        key: "address",
        render: (data: any) => <span>{data.address}</span>
    },
    {
        title: "Tags",
        key: "tags",
        render: (data: any) => (
            <Fragment>
                {data.tags.map((tag: string) => {
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
        render: (record: any) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <textarea>{record.action}</textarea>
                <a>Delete</a>
            </Space>
        )
    }
];

export default function PreviewComponent(props: { enablePaging: boolean; size: SizeType; fillContainer: boolean }) {
    return (
        <TableWrapper
            fillContainer={props.fillContainer}
            name="preview"
            size="large"
            enablePaging={props.enablePaging}
            columns={columns}
            dataSource={data}
        ></TableWrapper>
    );
}
