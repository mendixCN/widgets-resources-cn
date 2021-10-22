import { createElement, CSSProperties, Ref, useEffect, useRef, useState } from "react";
import { Map, ScaleControl, ToolBarControl, ControlBarControl, MapProps, Marker, Geolocation } from "@uiw/react-amap";

// @ts-ignore
window._jsload_ = () => {
    console.log("amap api loaded");
};
import classNames from "classnames";
import { useSize, useWhyDidYouUpdate } from "ahooks";
import { useMapCenter } from "../hooks/useMapCenter";
import { Alert } from "@mendix-cn/piw-utils-internal";
let lastValidAMap: any;
export interface AMarker {
    title: string;
    lat: number;
    lng: number;
}
export interface AMapComponentProps {
    // mx
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;

    amapKey?: string;
    onDblClick?: (event: AMap.MapsEvent, idx: number) => void;
    change?: (lat: number, lng: number) => void;
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
    const mapRef: Ref<MapProps & { map?: any | undefined }> | undefined = useRef(null);
    const [isMoving, setIsMoving] = useState(false);
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
        <div ref={ref} className={classNames(props.class, "mx-amap")} tabIndex={props.tabIndex} style={props.style}>
            {isLoadingApi ? (
                <span>loading</span>
            ) : (
                <Map
                    ref={mapRef}
                    zoom={props.zoom}
                    onMoveStart={() => setIsMoving(true)}
                    onMoveEnd={() => setIsMoving(false)}
                    onMapMove={() => {
                        if (props.change) {
                            props.change(mapRef.current?.map.getCenter().lat, mapRef.current?.map.getCenter().lng);
                        }
                    }}
                    onZoomChange={() => {
                        if (props.change) {
                            props.change(mapRef.current?.map.getCenter().lat, mapRef.current?.map.getCenter().lng);
                        }
                        return props.onZoomChange && props.onZoomChange(mapRef.current?.map.getZoom());
                    }}
                    center={isMoving ? undefined : [props.lng, props.lat]}
                    onDblClick={(event: AMap.MapsEvent) => {
                        if (props.change) {
                            props.change(event.lnglat.getLat!(), event.lnglat.getLng!());
                        }
                    }}
                >
                    {props.enableLocationMode ? (
                        <LocationSelectPoint></LocationSelectPoint>
                    ) : (
                        <Geolocation
                            // 是否使用高精度定位，默认:true
                            enableHighAccuracy
                            // 超过10秒后停止定位，默认：5s
                            timeout={10000}
                            // 定位按钮的停靠位置
                            // 官方 v2 不再支持
                            // buttonPosition="RB"

                            // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                            // 官方 v2 不再支持
                            // buttonOffset={new AMap.Pixel(10, 20)}

                            // 定位成功后是否自动调整地图视野到定位点
                            zoomToAccuracy={props.autoFocus}
                            onComplete={data => {
                                console.log("返回数据：", data);
                            }}
                            onError={data => {
                                console.log("错误返回数据：", data);
                            }}
                        />
                    )}
                    <ScaleControl offset={[16, 20]} position="LB" />
                    <ToolBarControl offset={[16, 60]} position="RB" />
                    <ControlBarControl position="RT" />
                    {props.marks.map((mark, idx) => (
                        <Marker
                            key={idx}
                            onDblClick={(e: any) => {
                                if (props.onDblClick) {
                                    props.onDblClick(e, idx);
                                }
                            }}
                            visiable
                            title={mark.title}
                            position={new AMap.LngLat(mark.lng, mark.lat)}
                        />
                    ))}
                </Map>
            )}
        </div>
    );
};
