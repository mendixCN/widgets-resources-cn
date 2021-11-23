import { createElement, useCallback, useEffect, useMemo, useState } from "react";
import { ValueStatus } from "mendix";
import { Button, Select } from "antd";

import { SelectContainerProps } from "../typings/SelectProps";

import "./ui/index.scss";
import { useDebounceFn, useMount, usePrevious } from "ahooks";

const LOADING_STRING = "_-_";
export interface SelectOption {
    label: string;
    value: string;
}
export default function SelectMX(props: SelectContainerProps) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    useMount(() => {
        props.options.setLimit(50);
        props.options.requestTotalCount(true);
    });
    const onChange = useCallback(
        (value: string) => {
            if (props.isMultiConst) {
                return;
            }
            const selectedObjectItem = props.options.items?.find(d => d.id === value);
            if (selectedObjectItem) {
                if (props.value && props.value.status === ValueStatus.Available) {
                    props.value.setValue(props.optionValue.get(selectedObjectItem).value?.toString());
                }
                if (props.onSelect && props.options.status === ValueStatus.Available) {
                    props.onSelect?.get(selectedObjectItem).execute();
                }
            }
        },
        [props.value, props.options]
    );

    const [onCreateLoading, setOnCreateLoading] = useState(false);

    useEffect(() => {
        setOnCreateLoading(props.onCreate?.isExecuting ?? false);
    }, [props.onCreate]);

    const onCreate = useCallback(
        (value: string) => {
            if (props.onCreate?.canExecute) {
                props.value?.setValue(value);
                props.onCreate?.execute();
            }
        },
        [props.onCreate]
    );

    const options = useMemo(() => {
        if (props.options.status === ValueStatus.Available) {
            const loadingOption: SelectOption = { value: LOADING_STRING, label: "加载中。。。" };

            const page = props.options.items?.map<SelectOption>(item => ({
                label: props.optionLabel.get(item).value!,
                id: item.id,
                value: props.optionValue.get(item).value!.toString()
            }));

            const leftOptions = Array(props.options.offset).fill(loadingOption);

            const rightOptions = Array(
                props.options.totalCount! - props.options.items!.length - props.options.offset
            ).fill(loadingOption);

            return leftOptions
                .concat(page)
                .concat(rightOptions)
                .map((v, i) => {
                    if (v.value === LOADING_STRING) {
                        return { label: v.label, value: LOADING_STRING + i.toString(), disabled: true };
                    } else {
                        return v;
                    }
                });
        }
    }, [props.options]);

    const preOptions = usePrevious(options);

    const [value, setValue] = useState<string | string[]>();

    useEffect(() => {
        if (props.isMultiConst && props.selectList && props.optionValueM) {
            if (props.selectList && props.selectList.status === ValueStatus.Available) {
                const listValue = props.selectList.items?.map(obj => props.optionValueM!.get(obj).value!.toString());
                setValue(listValue ?? []);
                props.value?.setValue((listValue ?? []).join(","));
            }
        }
    }, [props.selectList]);

    useEffect(() => {
        if (!props.isMultiConst && props.value && props.value.status === ValueStatus.Available) {
            setValue(props.value.value);
        }
    }, [props.value]);

    const { run } = useDebounceFn(
        (offset, _) => {
            props.options.setOffset(Math.max(0, offset - 1));
        },
        { wait: 300 }
    );

    const [searchValue, setSearchValue] = useState<string>("");
    const [open, setOpen] = useState(false);
    return (
        <Select
            className="mxcn-select"
            allowClear
            open={open}
            value={value}
            listItemHeight={32}
            onChange={onChange}
            onSelect={(_value, option) => {
                const obj = props.options?.items?.find(d => d.id === option.id);
                if (obj) {
                    props.onSelect?.get(obj).execute();
                }
                if (!props.isMultiConst) {
                    props.value?.setValue(_value);
                }
            }}
            onDeselect={(_value, option) => {
                const obj = props.options?.items?.find(d => d.id === option.id);
                if (obj) {
                    props.onDeselect?.get(obj).execute();
                }
            }}
            onClear={() => {
                const obj = props.options?.items?.find(d => props.optionValue.get(d).value === props.value?.value);
                props.value?.setTextValue("");
                if (obj) {
                    props.onDeselect?.get(obj).execute();
                }
            }}
            onDropdownVisibleChange={o => {
                setOpen(o);
                setDropdownVisible(o);
            }}
            onPopupScroll={e => {
                run(Math.floor(e.currentTarget.scrollTop / 32), e.currentTarget.clientHeight / 32);
            }}
            mode={props.isMultiConst ? "multiple" : undefined}
            options={dropdownVisible ? (options ? options : preOptions) : options}
            onSearch={setSearchValue}
            showSearch
            dropdownRender={menu =>
                searchValue ? (
                    <div className="mxcn-select-dropdown">
                        {menu}
                        <div aria-selected="false" className="ant-select-item ant-select-item-option">
                            <div className="ant-select-item-option-content">
                                <Button
                                    loading={onCreateLoading}
                                    block
                                    type="text"
                                    onClick={() => {
                                        onCreate(searchValue);
                                    }}
                                >
                                    创建并选择&nbsp;
                                    <span title={searchValue} className="on-create-text">
                                        {searchValue}
                                    </span>
                                </Button>
                            </div>
                            <span
                                className="ant-select-item-option-state"
                                unselectable="on"
                                aria-hidden="true"
                                style={{ userSelect: "none" }}
                            ></span>
                        </div>
                    </div>
                ) : (
                    menu
                )
            }
        ></Select>
    );
}
