import { createElement, useCallback, useEffect, useMemo, useState } from "react";
import { ValueStatus } from "mendix";

import { SelectContainerProps } from "../typings/SelectProps";
import SelectComponent, { SelectOption } from "./components/SelectComponent";

import "./ui/Select.css";
import { useDebounceFn, useMount, usePrevious } from "ahooks";

const LOADING_STRING = "_-_";

export default function Select(props: SelectContainerProps) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    useMount(() => {
        props.options.setLimit(100);
        props.options.requestTotalCount(true);
    });
    const onChange = useCallback(
        (value: string) => {
            if (value.startsWith(LOADING_STRING)) {
                return;
            }
            const selectedObjectItem = props.options.items?.find(d => d.id === value);
            if (selectedObjectItem) {
                if (props.value && props.value.status === ValueStatus.Available) {
                    props.value.setValue(props.optionValue.get(selectedObjectItem).value?.toString());
                }
                if (props.onChange && props.options.status === ValueStatus.Available) {
                    props.onChange?.get(selectedObjectItem).execute();
                }
            }
        },
        [props.value, props.options]
    );

    const isMulti = useMemo(() => {
        if (props.isMutiAttribute) {
            if (props.isMutiAttribute.status === ValueStatus.Available) {
                return props.isMutiAttribute.value!;
            }
        } else {
            return props.isMultiConst;
        }
        return undefined;
    }, [props.isMutiAttribute]);

    const options = useMemo(() => {
        if (props.options.status === ValueStatus.Available) {
            const loadingOption: SelectOption = { value: LOADING_STRING, label: "加载中。。。" };

            const page = props.options.items?.map<SelectOption>(item => ({
                label: props.optionLabel.get(item).value!,
                value: item.id
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
                        return { label: v.label, value: LOADING_STRING + i.toString() };
                    } else {
                        return v;
                    }
                });
        }
    }, [props.options]);

    const preOptions = usePrevious(options);

    const [value, setValue] = useState<string>();

    useEffect(() => {
        if (props.value && props.value.status === ValueStatus.Available) {
            setValue(props.value.value);
        }
    }, [props.value]);

    const { run } = useDebounceFn(
        (offset, _) => {
            props.options.setOffset(Math.max(0, offset - 1));
        },
        { wait: 300 }
    );

    return (
        <SelectComponent
            isMulti={isMulti}
            value={value}
            options={dropdownVisible ? (options ? options : preOptions) : options}
            onPopupScroll={run}
            onDropdownVisibleChange={setDropdownVisible}
            onChange={onChange}
        ></SelectComponent>
    );
}
