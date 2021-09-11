import { createElement } from "react";

import "../ui/antd.css";
import { Select } from "antd";
import { useWhyDidYouUpdate } from "ahooks";

export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectComponentProps {
    options?: SelectOption[];
    value?: string;
    isMulti?: boolean;
    onChange?: (value: string) => void;
    onPopupScroll?: (offset: number, pageSize: number) => void;
    loading?: boolean;
    onDropdownVisibleChange?: (open: boolean) => void;
}

export default function SelectComponent(props: SelectComponentProps) {
    useWhyDidYouUpdate("SelectComponent", { ...props });

    return (
        <Select
            allowClear
            loading={props.loading}
            value={props.value}
            listItemHeight={32}
            onChange={props.onChange}
            onDropdownVisibleChange={props.onDropdownVisibleChange}
            onPopupScroll={e => {
                if (props.onPopupScroll) {
                    props.onPopupScroll(Math.floor(e.currentTarget.scrollTop / 32), e.currentTarget.clientHeight / 32);
                }
            }}
            mode={props.isMulti ? "multiple" : undefined}
            style={{ width: "100%" }}
            options={props.options}
        ></Select>
    );
}
