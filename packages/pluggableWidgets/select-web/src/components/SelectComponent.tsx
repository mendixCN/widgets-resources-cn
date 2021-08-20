import { createElement } from "react";

import "../ui/antd.css";
import { Select } from "antd";

export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectComponentProps {
    options?: SelectOption[];
    value?: string;
    isMulti?: boolean;
    onChange?: (value: string) => void;
}

export default function SelectComponent(props: SelectComponentProps) {
    return props.options ? (
        <Select
            allowClear
            value={props.value}
            onChange={props.onChange}
            mode={props.isMulti ? "multiple" : undefined}
            style={{ width: "100%" }}
        >
            {props.options.map(item => (
                <Select.Option key={item.value} value={item.value}>
                    {item.label}
                </Select.Option>
            ))}
        </Select>
    ) : (
        <Select loading></Select>
    );
}
