import { createElement, ReactElement, useCallback, useMemo } from "react";
import { ValueStatus } from "mendix";
import { TransferContainer, TransferOnChangeEvent } from "./components/TransferContainer";

import { TransferContainerProps } from "../typings/TransferProps";

import { TransferDirection, TransferItem } from "antd/lib/transfer";

export default function Transfer(props: TransferContainerProps): ReactElement {
    const onChange = useCallback<TransferOnChangeEvent>(
        (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
            if (props.options.status !== ValueStatus.Available) {
                return undefined;
            }
            console.log(targetKeys, moveKeys, direction, props.onChange);
            props.targetKeys.setValue(targetKeys.join(","));
            props.onChange?.execute();
        },
        [props.onChange, props.options, props.targetKeys]
    );

    const data = useMemo<TransferItem[]>(() => {
        const d = props.options.items?.map<TransferItem>(option => ({
            key: props.keyAttribute.get(option).value?.toString(),
            title: props.titleAttribute.get(option).value
        }));
        return d ? d : [];
    }, [props.options, props.keyAttribute]);

    return (
        <TransferContainer
            targetKeys={props.targetKeys.value}
            onChange={onChange}
            isShowSearch={props.isShowSearch}
            leftTitle={props.leftTitle?.value}
            rightTitle={props.rightTitle?.value}
            data={data}
            isDisabled={props.isDisable}
        />
    );
}
