import { createElement, useCallback, useMemo, useState } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { ValueStatus } from 'mendix';
import { executeAction } from "@mendix/piw-utils-internal";

import { AMapContainerProps } from "../typings/AMapProps";

import "./ui/AMap.css";
import Big from "big.js";


export function AMap(props: AMapContainerProps) {
    const lng = useMemo(() => {
        if (props.lng && props.lng.status === ValueStatus.Available) {
            return props.lng.value!.toNumber();
        }
        return 0;
    }, [props.lng]);
    const lat = useMemo(() => {
        if (props.lat && props.lat.status === ValueStatus.Available) {
            return props.lat.value!.toNumber();
        }
        return 0;
    }, [props.lat]);

    const onChange = useCallback(
        (lat: number, lng: number) => {
            console.log(lng);

            setTimeout(() => {
                executeAction(props.onChange);
            }, 500);
            if (props.lat && props.lat.status === ValueStatus.Available) {
                props.lat.setValue(new Big(lat));
            }
            if (props.lng && props.lng.status === ValueStatus.Available) {
                props.lng.setValue(new Big(lng));
            }
        },
        [props.lat, props.lng, props.onChange],
    )
    return <HelloWorldSample lat={lat} lng={lng} change={onChange} sampleText={props.sampleText ? props.sampleText : "World"} />;
}

