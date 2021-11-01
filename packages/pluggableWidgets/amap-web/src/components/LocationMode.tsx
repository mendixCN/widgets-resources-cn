import { createElement, Ref, useEffect, useRef, useState } from "react";
import { Map, ScaleControl, ToolBarControl, ControlBarControl, Geolocation, MapProps } from "@uiw/react-amap";
import classNames from "classnames";
import { useSize } from "ahooks";
import { useMapCenter } from "../hooks/useMapCenter";

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

interface LocationModeProps {
    autoFocus: boolean;
    onCenterChange?: (lat: number, lng: number) => void;
    zoom: number;
    onZoomChange?: (zoom: number) => void;
    lat: number;
    lng: number;
    /**
     * 坐标拾取模式
     */
    enableLocationMode?: boolean;
}

export default function LocationMode(props: LocationModeProps) {
    const [isMoving, setIsMoving] = useState(false);
    const mapRef: Ref<MapProps & { map?: any | undefined }> | undefined = useRef(null);

    return (
        <Map
            className={classNames("flexitem-9")}
            ref={mapRef}
            zoom={props.zoom}
            onMoveStart={() => setIsMoving(true)}
            onMoveEnd={() => setIsMoving(false)}
            onMapMove={() => {
                if (props.onCenterChange) {
                    props.onCenterChange(mapRef.current?.map.getCenter().lat, mapRef.current?.map.getCenter().lng);
                }
            }}
            onZoomChange={() => {
                if (props.onCenterChange) {
                    props.onCenterChange(mapRef.current?.map.getCenter().lat, mapRef.current?.map.getCenter().lng);
                }
                return props.onZoomChange && props.onZoomChange(mapRef.current?.map.getZoom());
            }}
            center={isMoving ? undefined : [props.lng, props.lat]}
            onDblClick={(event: AMap.MapsEvent) => {
                if (props.onCenterChange) {
                    props.onCenterChange(event.lnglat.getLat!(), event.lnglat.getLng!());
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
        </Map>
    );
}
