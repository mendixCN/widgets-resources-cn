import React, { createElement, ReactElement, useState } from "react";
import { Transfer } from "antd";


export interface HelloWorldSampleProps {
    isDisabled?: boolean;
}


const mockData: any[] | undefined = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`
    });
}

const initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);

export const HelloWorldSample = (props: HelloWorldSampleProps): ReactElement | null => {
    console.log(props);

    const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
    const onChange = (nextTargetKeys: React.SetStateAction<string[]>, direction: any, moveKeys: any) => {
        console.log("targetKeys:", nextTargetKeys);
        console.log("direction:", direction);
        console.log("moveKeys:", moveKeys);
        setTargetKeys(nextTargetKeys);
    };

    const onSelectChange = (sourceSelectedKeys: any, targetSelectedKeys: any) => {
        console.log("sourceSelectedKeys:", sourceSelectedKeys);
        console.log("targetSelectedKeys:", targetSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const onScroll = (direction: any, e: { target: any }) => {
        console.log("direction:", direction);
        console.log("target:", e.target);
    };

    return (
        <Transfer
            dataSource={mockData}
            disabled={props.isDisabled}
            titles={["Source", "Target"]}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
            onScroll={onScroll}
            render={item => item.title}
        />
    );
};
