import { createElement, useCallback, useEffect, useMemo, useState } from "react";

import { ValueStatus } from "mendix";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import moment from "moment";

import "./ui/index.scss";
import { DatePickerContainerProps } from "../typings/DatePickerProps";
import { useWhyDidYouUpdate } from "ahooks";

function getDefaultFormat(format: string, picker: string, showTime: boolean, use12Hours: boolean) {
    let mergedFormat = format;

    if (!mergedFormat) {
        switch (picker) {
            case "time":
                mergedFormat = use12Hours ? "hh:mm:ss a" : "HH:mm:ss";
                break;

            case "week":
                mergedFormat = "gggg-wo";
                break;

            case "month":
                mergedFormat = "YYYY-MM";
                break;

            case "quarter":
                mergedFormat = "YYYY-[Q]Q";
                break;

            case "year":
                mergedFormat = "YYYY";
                break;

            default:
                mergedFormat = showTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
        }
    }

    return mergedFormat;
}

export default function DatePickerMX(props: DatePickerContainerProps) {
    const [value, setValue] = useState<any>();

    const dateFormat = useMemo(() => {
        return getDefaultFormat(props.dateFormat, props.picker, props.showTime, false);
    }, [props.dateFormat, props.showTime, props.picker]);

    const onChange = useCallback(
        (value: any | null, dateString: any) => {
            setValue(value);
            if (props.mode === "date") {
                if (props.value && props.value.status === ValueStatus.Available) {
                    if (props.value.formatter.type === "datetime") {
                        props.value.setValue(value ? value.toDate() : undefined);
                    } else {
                        props.value.setValue(dateString);
                    }
                }
            } else {
                if (props.valueFrom && props.valueFrom.status === ValueStatus.Available) {
                    if (props.valueFrom.formatter.type === "datetime") {
                        props.valueFrom.setValue(value ? value[0].toDate() : undefined);
                    } else {
                        props.valueFrom.setValue(dateString ? dateString[0] : undefined);
                    }
                }

                if (props.valueTo && props.valueTo.status === ValueStatus.Available) {
                    if (props.valueTo.formatter.type === "datetime") {
                        props.valueTo.setValue(value ? value[1].toDate() : undefined);
                    } else {
                        props.valueTo.setValue(dateString ? dateString[1] : undefined);
                    }
                }
            }
            if (props.onChange && props.onChange.canExecute) {
                props.onChange.execute();
            }
        },
        [props.onChange, props.value, props.valueFrom, props.valueTo]
    );

    useEffect(() => {
        if (props.mode === "date" && props.value?.status === ValueStatus.Available) {
            setValue(props.value.value ? moment(props.value.value, dateFormat) : undefined);
        }
    }, [props.value]);

    useEffect(() => {
        if (
            props.mode === "range" &&
            props.valueFrom?.status === ValueStatus.Available &&
            props.valueTo?.status === ValueStatus.Available
        ) {
            if (props.valueFrom.value && props.valueTo.value) {
                const from = moment(props.valueFrom.value, dateFormat);
                const to = moment(props.valueTo.value, dateFormat);
                if (from.isValid() && to.isValid()) {
                    setValue([from, to]);
                    return;
                }
            }
        }
        setValue(undefined);
    }, [props.valueFrom, props.valueTo]);

    useWhyDidYouUpdate(props.name, { ...props });
    useWhyDidYouUpdate(props.name, { value, onChange });

    return (
        <div className={props.class} style={props.style} tabIndex={props.tabIndex}>
            {props.mode === "date" ? (
                <DatePicker
                    format={props.dateFormat}
                    bordered={props.border}
                    picker={props.picker}
                    showTime={props.showTime}
                    size={props.size}
                    value={value}
                    onChange={onChange}
                ></DatePicker>
            ) : (
                <RangePicker
                    format={props.dateFormat}
                    bordered={props.border}
                    picker={props.picker}
                    showTime={props.showTime}
                    size={props.size}
                    value={value}
                    onChange={onChange}
                ></RangePicker>
            )}
        </div>
    );
}
