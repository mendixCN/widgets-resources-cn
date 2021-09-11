import { createElement, useCallback, useEffect, useMemo, useState } from "react";
import { ValueStatus } from "mendix";

import { SelectContainerProps } from "../typings/SelectProps";
import SelectComponent, { SelectOption } from "./components/SelectComponent";

import "./ui/Select.css";
import { useDebounceFn, useMount, usePrevious } from "ahooks";

export default function Select(props: SelectContainerProps) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    useMount(() => {
        props.options.setLimit(10);
        props.options.requestTotalCount(true);
    });
    const onChange = useCallback(
        (value: string) => {
            if (props.value.status === ValueStatus.Available) {
                props.value.setValue(value);
            }
        },
        [props.value]
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
            const loadingOption: SelectOption = { value: "-", label: "加载中。。。" };

            const page = props.options.items?.map<SelectOption>(item => ({
                label: props.optionLabel.get(item).value!,
                value: props.optionValue.get(item).value!.toString()
            }));

            const leftOptions = Array(props.options.offset).fill(loadingOption);

            const rightOptions = Array(
                props.options.totalCount! - props.options.items!.length - props.options.offset
            ).fill(loadingOption);

            return leftOptions
                .concat(page)
                .concat(rightOptions)
                .map((v, i) => ({ label: v.label, value: i.toString() }));
        }
    }, [props.options]);

    const preOptions = usePrevious(options);

    const [value, setValue] = useState<string>();

    useEffect(() => {
        if (props.value.status === ValueStatus.Available) {
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
