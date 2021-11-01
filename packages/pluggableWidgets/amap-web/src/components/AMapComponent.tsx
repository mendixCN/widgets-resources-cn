import { createElement, CSSProperties, useEffect, useRef, useState } from "react";

// @ts-ignore
window._jsload_ = () => {
    console.log("amap api loaded");
};
import classNames from "classnames";
import { useSize, useWhyDidYouUpdate } from "ahooks";
import { useMapCenter } from "../hooks/useMapCenter";
import { Alert } from "@mendix-cn/piw-utils-internal";
import { ModeEnum } from "../../typings/AMapProps";
import LocationMode from "./LocationMode";
import RoiMode, { AMarker } from "./RoiMode";
import NavMode from "./NavMode";
let lastValidAMap: any;
export interface AMapComponentProps {
    // mx
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;

    mode: ModeEnum;
    startAndEnd?: [number, number, number, number];

    amapKey?: string;
    onDblClick?: (event: AMap.MapsEvent, idx: number) => void;
    onCenterChange?: (lat: number, lng: number) => void;
    zoom: number;
    /**
     * 坐标拾取模式
     */
    enableLocationMode?: boolean;
    lat: number;
    lng: number;
    autoFocus: boolean;
    marks: AMarker[];
    onZoomChange?: (zoom: number) => void;
}

/**
 * AMap child componet
 * @param p
 * @returns
 */
export function LocationSelectPoint(p: any) {
    const markerRef = useRef<AMap.Marker>();
    const size = useSize(p.container);

    const center = useMapCenter(p.map);
    useEffect(() => {
        if (!markerRef.current) {
            const marker = new AMap.Marker({
                content:
                    '<img class="amap-geolocation-marker" src="https://a.amap.com/jsapi/static/image/plugin/point.png">',
                offset: new AMap.Pixel(-10, -10)
            });
            markerRef.current = marker;
            p.map.add(marker);
        }

        if (size.width && size.height) {
            const a: AMap.LngLat = p.map.containerToLngLat([size.width / 2, size.height / 2]);
            markerRef.current.setPosition([a.getLng!(), a.getLat!()]);
        }
    }, [size, center]);

    return null;
}

export const AMapComponent = (props: AMapComponentProps) => {
    const [isLoadingApi, setIsLoadingApi] = useState(true);
    const ref = useRef<any>();
    const [keyIsInvalid, setKeyIsInvalid] = useState(false);

    useEffect(() => {
        if (isLoadingApi && props.amapKey && !window.AMap) {
            (window.require as any)(
                [`https://webapi.amap.com/maps?v=2.0&key=${props.amapKey}&plugin=AMap.Adaptor`],
                (_AMap: any) => {
                    if (!window.AMap && typeof _AMap === "object") {
                        lastValidAMap = _AMap;
                        window.AMap = _AMap;
                    }
                    if (_AMap === 3) {
                        setKeyIsInvalid(true);
                        if (lastValidAMap) {
                            window.AMap = lastValidAMap;
                        }
                    }
                    setIsLoadingApi(false);
                }
            );
        }
        if (window.AMap) {
            setIsLoadingApi(false);
        }
    }, [isLoadingApi, props.amapKey]);

    useWhyDidYouUpdate(props.name, { ...props });

    if (keyIsInvalid) {
        return <Alert bootstrapStyle="danger">请指定一个正确的高德地图webapi key</Alert>;
    }

    return (
        <div
            ref={ref}
            className={classNames(props.class, "mx-amap", "flexcontainer")}
            tabIndex={props.tabIndex}
            style={props.style}
        >
            {isLoadingApi ? (
                <span>loading</span>
            ) : props.mode === "location" ? (
                <LocationMode
                    enableLocationMode={props.enableLocationMode}
                    autoFocus={props.autoFocus}
                    onCenterChange={props.onCenterChange}
                    zoom={props.zoom}
                    onZoomChange={props.onZoomChange}
                    lat={props.lat}
                    lng={props.lng}
                ></LocationMode>
            ) : props.mode === "marker" ? (
                <RoiMode
                    change={props.onCenterChange}
                    marks={props.marks}
                    onCenterChange={props.onCenterChange}
                    zoom={props.zoom}
                    onZoomChange={props.onZoomChange}
                    lat={props.lat}
                    lng={props.lng}
                    onDblClick={props.onDblClick}
                ></RoiMode>
            ) : (
                <NavMode startAndEnd={props.startAndEnd}></NavMode>
            )}
        </div>
    );
};
