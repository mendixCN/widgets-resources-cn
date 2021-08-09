import { createElement, ReactElement, useEffect, useState } from "react";
import { ConfigProvider, Transfer } from "antd";
import "../ui/antd.css";
import "../ui/Transfer.css";
import zhCN from 'antd/lib/locale/zh_CN';
import { TransferDirection, TransferItem } from "antd/lib/transfer";
import { BaiduMap } from "./BaiduMap";

export type TransferOnChangeEvent = (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void;

export interface TransferContainerProps {
    leftTitle: string;
    rightTitle: string;
    isDisabled?: boolean;
    data: TransferItem[];
    isShowSearch: boolean;
    onChange: TransferOnChangeEvent;
    targetKeys: string | undefined;
}

export const TransferContainer = (props: TransferContainerProps): ReactElement | null => {

    const [targetKeys, setTargetKeys] = useState<string[] | undefined>(undefined);

    useEffect(() => {
        setTargetKeys(props.targetKeys !== null && props.targetKeys !== undefined && props.targetKeys.length > 0 ? props.targetKeys.split(',') : undefined);
        return () => {
        }
    }, [props.targetKeys]);

    console.log(props.data, 'target');

    props.data = [{ "key": "1", "title": "1" }, { "key": "2", "title": "2" }, { "key": "3", "title": "3" }, { "key": "4", "title": "label-4" }];

    return (
        <ConfigProvider locale={zhCN}>
            <BaiduMap></BaiduMap>
            <Transfer
                className="widget-hello-world"
                showSearch={props.isShowSearch}
                dataSource={props.data}
                disabled={props.isDisabled}
                titles={[props.leftTitle, props.rightTitle]}
                targetKeys={targetKeys}
                onChange={(targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
                    setTargetKeys(targetKeys);
                    props.onChange(targetKeys, direction, moveKeys);
                }}
                render={item => item.title!}
            />
        </ConfigProvider>
    );
};
