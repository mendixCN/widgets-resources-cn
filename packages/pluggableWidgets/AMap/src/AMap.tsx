import { createElement, useCallback, useMemo, useState } from "react";
import { AMapComponent, AMarker } from "./components/AMapComponent";
import { ValueStatus } from 'mendix';
import { executeAction } from "@mendix/piw-utils-internal";
import { debounce } from "@mendix/piw-utils-internal";

import { AMapContainerProps } from "../typings/AMapProps";

import "./ui/AMap.css";
import Big from "big.js";


export function AMap(props: AMapContainerProps) {
    const [isLoading, setIsLoading] = useState(false);
    const zoom = useMemo(() => {
        if (props.zoomAttribute == undefined) {
            return props.zoomConst.toNumber();
        }
        if (props.zoomAttribute && props.zoomAttribute.status === ValueStatus.Available) {
            setIsLoading(false);
            return props.zoomAttribute.value!.toNumber();
        }
        setIsLoading(true);
        return 15;
    }, [props.zoomAttribute]);

    const lng = useMemo(() => {
        if (props.lngCenter && props.lngCenter.status === ValueStatus.Available) {
            return props.lngCenter.value!.toNumber();
        }
        return 0;
    }, [props.lngCenter]);

    const lat = useMemo(() => {
        if (props.latCenter && props.latCenter.status === ValueStatus.Available) {
            return props.latCenter.value!.toNumber();
        }
        return 0;
    }, [props.latCenter]);

    const onChange = useCallback(
        (lat: number, lng: number) => {
            // setTimeout(() => {
            //     executeAction(props.onChangeCenter);
            // }, 500);
            if (props.latCenter && props.latCenter.status === ValueStatus.Available) {
                props.latCenter.setValue(new Big(lat));
            }
            if (props.lngCenter && props.lngCenter.status === ValueStatus.Available) {
                props.lngCenter.setValue(new Big(lng));
            }
        },
        [props.latCenter, props.lngCenter],
    );
    const onZoomChange = useCallback(
        debounce((e: number) => {
            if (props.zoomAttribute && !props.zoomAttribute.readOnly) {
                props.zoomAttribute?.setValue(Big(e));
            }
        }, 300),
        [props.zoomAttribute],
    );

    const marks = useMemo<AMarker[]>(() => {
        if (props.enableMarker && props.displayMarker && props.markers?.status === ValueStatus.Available) {
            return props.markers!.items!.map<AMarker>(item => ({ title: props.titleMarker!.get(item).value!, lat: props.latMarker!.get(item).value!.toNumber(), lng: props.lngMarker!.get(item).value!.toNumber() }))
        } else {
            return [];
        }
    }, [props.markers, props.latMarker, props.lngMarker, props.titleMarker]);

    console.log(marks);

    const onDblClick = useCallback((event: AMap.MapsEvent, idx: number) => {
        console.log(event);
        if (props.markerSelect && props.markers && props.markers.status === ValueStatus.Available) {
            const myAction = props.markerSelect.get(props!.markers!.items![idx]);
            executeAction(myAction);
        }
    }, [props.markerSelect, props.markers]);
    return isLoading ? <span>isLoading</span> : <AMapComponent onDblClick={onDblClick} marks={marks} onZoomChange={onZoomChange} zoom={zoom} lat={lat} lng={lng} change={onChange} />;
}

