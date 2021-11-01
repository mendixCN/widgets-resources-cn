import { createElement, useCallback, useEffect, useMemo, useState } from "react";
import { AMapComponent } from "./components/AMapComponent";
import { ValueStatus } from "mendix";
import { executeAction, debounce } from "@mendix-cn/piw-utils-internal";

import { AMapContainerProps } from "../typings/AMapProps";

import "./ui/AMap.css";
import Big from "big.js";
import { AMarker } from "./components/RoiMode";

export function AMap(props: AMapContainerProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [centerLat, setCenterLat] = useState(22.268233);
    const [centerLng, setCenterLng] = useState(113.515943);
    if (props.centerType === "dynamicValue") {
        useEffect(() => {
            if (props.lngCenter && props.lngCenter.status === ValueStatus.Available) {
                setCenterLng(props.lngCenter.value!.toNumber());
            }
            if (props.latCenter && props.latCenter.status === ValueStatus.Available) {
                setCenterLat(props.latCenter.value!.toNumber());
            }
        }, [props.latCenter, props.lngCenter]);
    } else {
        useEffect(() => {
            setCenterLat(props.latCenterStatic.toNumber());
            setCenterLng(props.lngCenterStatic.toNumber());
        }, [props.latCenterStatic, props.lngCenterStatic]);
    }
    const zoom = useMemo(() => {
        if (props.zoomAttribute === undefined) {
            setIsLoading(false);
            return props.zoomConst.toNumber();
        }
        if (props.zoomAttribute && props.zoomAttribute.status === ValueStatus.Available) {
            setIsLoading(false);
            return props.zoomAttribute.value!.toNumber();
        }
        setIsLoading(true);
        return 15;
    }, [props.zoomAttribute]);

    const onCenterChange = useCallback(
        (lat: number, lng: number) => {
            setCenterLat(lat);
            setCenterLng(lng);
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
        [props.latCenter, props.lngCenter]
    );
    const onZoomChange = useCallback(
        debounce((e: number) => {
            if (props.zoomAttribute && !props.zoomAttribute.readOnly) {
                props.zoomAttribute?.setValue(Big(e));
            }
        }, 300),
        [props.zoomAttribute]
    );

    const marks = useMemo<AMarker[]>(() => {
        if (props.enableMarker && props.displayMarker && props.markers?.status === ValueStatus.Available) {
            return props.markers!.items!.map<AMarker>(item => ({
                title: props.titleMarker!.get(item).value!,
                lat: props.latMarker!.get(item).value!.toNumber(),
                lng: props.lngMarker!.get(item).value!.toNumber()
            }));
        } else {
            return [];
        }
    }, [props.markers, props.latMarker, props.lngMarker, props.titleMarker]);

    const onDblClick = useCallback(
        (event: AMap.MapsEvent, idx: number) => {
            console.log(event);
            if (props.markerSelect && props.markers && props.markers.status === ValueStatus.Available) {
                const myAction = props.markerSelect.get(props!.markers!.items![idx]);
                executeAction(myAction);
            }
        },
        [props.markerSelect, props.markers]
    );

    const keystring = useMemo(() => {
        if (props.amapKey.status === ValueStatus.Available) {
            return props.amapKey.value;
        }
    }, [props.amapKey]);

    const [startAndEnd, setStartAndEnd] = useState<[number, number, number, number] | undefined>();
    useEffect(() => {
        if (
            props.startLng &&
            props.startLat &&
            props.endLng &&
            props.endLat &&
            props.startLng.status === ValueStatus.Available &&
            props.startLat.status === ValueStatus.Available &&
            props.endLng.status === ValueStatus.Available &&
            props.endLat.status === ValueStatus.Available
        ) {
            setStartAndEnd([
                props.startLng.value!.toNumber(),
                props.startLat.value!.toNumber(),
                props.endLng.value!.toNumber(),
                props.endLat.value!.toNumber()
            ]);
        }
    }, [props.startLng, props.startLat, props.endLng, props.endLat]);

    return isLoading ? (
        <span>isLoading</span>
    ) : (
        <AMapComponent
            startAndEnd={startAndEnd}
            mode={props.mode}
            amapKey={keystring}
            onDblClick={onDblClick}
            marks={marks}
            onZoomChange={onZoomChange}
            zoom={zoom}
            lat={centerLat}
            lng={centerLng}
            enableLocationMode={props.enableLocationMode}
            onCenterChange={onCenterChange}
            autoFocus={props.enableAutoFocus}
            // mx
            name={props.name}
            style={props.style}
            tabIndex={props.tabIndex}
            class={props.class}
        />
    );
}
