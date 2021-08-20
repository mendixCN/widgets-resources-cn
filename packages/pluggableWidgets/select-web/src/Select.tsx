import { createElement, useCallback, useEffect, useMemo, useState } from "react";
import { ValueStatus } from "mendix";

import { SelectContainerProps } from "../typings/SelectProps";
import SelectComponent, { SelectOption } from "./components/SelectComponent";

import "./ui/Select.css";

export default function Select(props: SelectContainerProps) {
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
            return props.options.items?.map<SelectOption>(item => ({
                label: props.optionLabel.get(item).value!,
                value: props.optionValue.get(item).value!
            }));
        }
    }, [props.options]);

    const [value, setValue] = useState<string>();

    useEffect(() => {
        if (props.value.status === ValueStatus.Available) {
            setValue(props.value.value);
        }
        return () => {};
    }, [props.value]);

    return <SelectComponent isMulti={isMulti} value={value} options={options} onChange={onChange}></SelectComponent>;
}
